import { Input, Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Checkbox, FormControl, FormHelperText, FormLabel, Select } from '@chakra-ui/react';
import MarkdownEditor from 'components/ui/forms/MarkdownEditor';
import ProjectVulnerabilityMetrics from 'models/ProjectVulnerabilityMetrics';
import RemediationComplexity from 'models/RemediationComplexity';
import RemediationPriority from 'models/RemediationPriority';
import { useEffect, useState } from 'react';
import { unstable_batchedUpdates } from "react-dom";
import 'react-mde/lib/styles/css/react-mde-all.css';
import Risks from "../../models/Risks";
import secureApiFetch from "../../services/api";
import Primary from "../ui/buttons/Primary";
import { parentChildNames } from './categories/Span';
import CvssAbbr from './CvssAbbr';
import OwaspRR from './OwaspRR'


const VulnerabilityForm = ({
    isEditForm = false,
    vulnerability,
    vulnerabilitySetter: setVulnerability,
    onFormSubmit
}) => {
    const [initialised, setInitialised] = useState(false);
    const [projects, setProjects] = useState(null);
    const [categories, setCategories] = useState(null);
    const [targets, setTargets] = useState(null);
    const [useOWASP, setMetrics] = useState(false);
    const [isValidOwaspVector, setIsValidOwaspVector] = useState(true);

    useEffect(() => {
        if (initialised) return;

        Promise.all([
            secureApiFetch(`/projects`, { method: 'GET' }),
            secureApiFetch(`/vulnerabilities/categories`, { method: 'GET' }),
        ])
            .then(resp => {
                const [respA, respB] = resp;
                return Promise.all([respA.json(), respB.json()]);
            })
            .then(([projects, categories]) => {
                const defaultProjectId = projects.length ? projects[0].id : 0;
                const projectId = isEditForm ? vulnerability.project_id : defaultProjectId;
                setMetrics(isOwaspProject(projects, projectId))
  
                secureApiFetch(`/targets?projectId=${projectId}`, { method: 'GET' })
                    .then(resp => resp.json())
                    .then(targets => {
                        unstable_batchedUpdates(() => {
                            setProjects(projects);
                            setCategories(categories);
                            setTargets(targets);
                            setVulnerability(prevVulnerability => {
                                let updatedVulnerability = prevVulnerability;
                                if (!idExists(projects, prevVulnerability.project_id)) {
                                    updatedVulnerability.project_id = defaultProjectId;
                                }
                                if (!idExists(categories, prevVulnerability.category_id)) {
                                    updatedVulnerability.category_id = categories[0].id;
                                }
                                if (!idExists(targets, vulnerability.target_id)) {
                                    updatedVulnerability.target_id = null;
                                }
                                return updatedVulnerability;
                            })
                            setInitialised(true);
                        });
                    })
            });
    }, [initialised, isEditForm, setProjects, setCategories, setTargets, setMetrics, setVulnerability, vulnerability.target_id, vulnerability.project_id]);

    useEffect(() => {
        if (!initialised) return;

        const projectId = vulnerability.project_id;
        secureApiFetch(`/targets?projectId=${projectId}`, { method: 'GET' })
            .then(resp => resp.json())
            .then(targets => {
                unstable_batchedUpdates(() => {
                    setTargets(targets);
                    if (isEditForm) { // Edit
                        if (!idExists(targets, vulnerability.target_id)) {
                            setVulnerability(prevVulnerability => {
                                return { ...prevVulnerability, target_id: 0 }
                            });
                        }
                    }
                });
            })
    }, [initialised, isEditForm, setTargets, setVulnerability, vulnerability.target_id, vulnerability.project_id]);

    const idExists = (elements, id) => {
        for (const el of elements) {
            if (el.id === parseInt(id)) return true;
        }
        return false;
    }

    const isOwaspProject = (elements, id) => {
        let metrics = ProjectVulnerabilityMetrics[0].id;
        for (const el of elements) {
            if (el.id === parseInt(id)) {
                metrics = el.vulnerability_metrics;
            }
        }
        return (ProjectVulnerabilityMetrics[1].id === metrics);
    }

    const validateVector = (vector) => {
        const vectorRegex =  new RegExp(/^\(SL:[1,3,5,6,9]\/M:[1,4,9]\/O:[0,4,7,9]\/S:[2,4,5,6,9]\/ED:[1,3,7,9]\/EE:[1,3,5,9]\/A:[1,4,6,9]\/ID:[1,3,8,9]\/LC:[2,6,7,9]\/LI:[1,3,5,7,9]\/LAV:[1,5,7,9]\/LAC:[1,7,9]\/FD:[1,3,7,9]\/RD:[1,4,5,9]\/NC:[2,5,7]\/PV:[3,5,7,9]\)$/);
        const isValid = vectorRegex.test(vector);
        setIsValidOwaspVector(isValid);
        return isValid;
    }

    const parseVector = (vector) => {
        return vector.slice(1, -1).split(/\//).map(s => s.split(':'));
    }

    const computeLikehood = (fields) => {
        let sum = 0;
        fields.map(([key, value]) => {
            if ((key === 'SL') || (key === 'M') || (key === 'O') || (key === 'S')
                || (key === 'ED') || (key === 'EE') || (key === 'A') || (key === 'ID'))
            {
                sum += parseInt(value);
            }
        });
        return sum/8;
    }

    const computeImpact = (fields) => {
        let sum = 0;
        fields.map(([key, value]) => {
            if ((key === 'LC') || (key === 'LI') || (key === 'LAV') || (key === 'LAC')
                || (key === 'FD') || (key === 'RD') || (key === 'NC') || (key === 'PV'))
            {
                sum += parseInt(value);
            }
        });
        return sum/8;
    }

    const computeOverall = (impact, likehood) => {
        if ((impact < 3) && (likehood < 3)) {
            return 'note';
        } else if (((impact < 3) && (likehood < 6)) || ((impact < 6) && (likehood < 3))) {
            return 'low';
        } else if ((impact < 3) || (likehood < 3) || ((impact < 6) && (likehood < 6))) {
            return 'medium';
        } else if ((impact < 6) || (likehood < 6)) {
            return 'high';
        } else {
            return 'critical';
        }
    }

    const computeValues = (fields) => {
        const likehood = computeLikehood(fields);
        const impact = computeImpact(fields);
        const overall = computeOverall(impact, likehood);
        return [impact, likehood, overall];
    }


    const computeOwaspScores = (vector) => {
        let fields = parseVector(vector);
        return computeValues(fields);
    }

    const onFormChange = ev => {
        const target = ev.target;
        const name = target.name;
        let value = target.type === 'checkbox' ? target.checked : target.value;

        if ('tags' === name) {
            value = JSON.stringify(value.split(','));
        }
        if (('owasp_vector' === name) && validateVector(value))
        {
                let scores = computeOwaspScores(value);
                setVulnerability({ ...vulnerability, 'owasp_impact': scores[0], 'owasp_likehood': scores[1], 'owasp_overall': scores[2], [name]: value });
            
        }
        else
        {
            setVulnerability({ ...vulnerability, [name]: value });
        }
    };

    return <form onSubmit={onFormSubmit} className="crud">
        <Accordion defaultIndex={0} allowToggle allowMultiple>
            <AccordionItem index={0}>
                <h2>
                    <AccordionButton>
                        <Box flex="1" textAlign="left">
                            Basic information
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    <label>Properties
                        <div>
                            <Checkbox name="is_template" onChange={onFormChange} isChecked={vulnerability.is_template}>Is template</Checkbox>
                        </div>
                    </label>
                    <label>External ID
                        <input type="text" name="external_id" value={vulnerability.external_id || ""} onChange={onFormChange} />
                    </label>
                    <label>Summary
                        <input type="text" name="summary" value={vulnerability.summary || ""} onChange={onFormChange} required autoFocus />
                    </label>
                    <label>Description
                        <MarkdownEditor name="description" value={vulnerability.description || ""} onChange={onFormChange} />
                    </label>
                    <label>External references
                        <MarkdownEditor name="external_refs" value={vulnerability.external_refs || ""} onChange={onFormChange} />
                    </label>
                    <label>Category
                        <Select name="category_id" value={vulnerability.category_id || ""} onChange={onFormChange} required>
                            <option>(none)</option>
                            {categories && categories.map(category =>
                                <option key={category.id} value={category.id}>{parentChildNames(category.parent_name, category.name)}</option>
                            )}
                        </Select>
                    </label>
                    <FormControl id="visibility" isRequired>
                        <FormLabel>Visibility</FormLabel>
                        <Select name="visibility" value={vulnerability.visibility || ""} onChange={onFormChange}>
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                        </Select>
                        <FormHelperText>Private makes this vulnerability not visible to the client.</FormHelperText>
                    </FormControl>
                    <label>Risk
                        <Select name="risk" value={vulnerability.risk || ""} onChange={onFormChange} required>
                            {Risks.map(risk =>
                                <option key={risk.id} value={risk.id}>{risk.name}</option>
                            )}
                        </Select>
                    </label>
                    <label>Tags
                        <input type="text" name="tags" onChange={onFormChange} value={vulnerability.tags ? JSON.parse(vulnerability.tags).join(',') : ''} />
                    </label>
                    <label>Proof of concept
                        <MarkdownEditor name="proof_of_concept" value={vulnerability.proof_of_concept || ""} onChange={onFormChange} />
                    </label>
                    <label>Impact
                        <MarkdownEditor name="impact" value={vulnerability.impact || ""} onChange={onFormChange} />
                    </label>
                    {
                        !useOWASP && <>
                            <label>CVSS score
                                <input type="number" step="0.1" min="0" max="10" name="cvss_score" value={vulnerability.cvss_score || ""}
                                    onChange={onFormChange} />
                            </label>
                            <label><span><CvssAbbr /> vector</span>
                                <input type="text" name="cvss_vector" value={vulnerability.cvss_vector || ""} onChange={onFormChange} placeholder="eg: AV:N/AC:L/Au:S/C:P/I:P/A:N" />
                            </label>
                        </>
                    }
                    {
                        useOWASP && <>
                            <label>OWASP Risk Rating vector
                                <Input type="text" name="owasp_vector" value={vulnerability.owasp_vector || ""}
                                    isInvalid={!isValidOwaspVector}
                                    onChange={onFormChange} placeholder="eg: (SL:1/M:1/O:0/S:2/ED:1/EE:1/A:1/ID:1/LC:2/LI:1/LAV:1/LAC:1/FD:1/RD:1/NC:2/PV:3)" />
                            </label>
                            <label>OWASP Likehoood score
                                <input type="number" step="0.1" min="0" max="10" name="owasp_likehood" value={vulnerability.owasp_likehood || 0.0}
                                    disabled />
                            </label>
                            <label>OWASP Impact score
                                <input type="number" step="0.1" min="0" max="10" name="owasp_impact" value={vulnerability.owasp_impact || 0.0}
                                    disabled />
                            </label>
                            <label>OWASP Overall score
                                <input type="text" name="owasp_overall" value={vulnerability.owasp_overall || "n/a"}
                                    disabled />
                            </label>
                        </>
                    }
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                <h2>
                    <AccordionButton>
                        <Box flex="1" textAlign="left">
                            Owasp Risk Rating calculator
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    
                    {
                        useOWASP && <>
                            <label>Owasp Risk Rating Chart</label>
                            <OwaspRR />
                        </>
                    }
                </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
                <h2>
                    <AccordionButton>
                        <Box flex="1" textAlign="left">
                            Remediation
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>

                    <label>Remediation instructions
                        <MarkdownEditor name="remediation" value={vulnerability.remediation || ""} onChange={onFormChange} />
                    </label>
                    <label>Remediation complexity
                        <Select name="remediation_complexity" value={vulnerability.remediation_complexity || ""} onChange={onFormChange} required>
                            {RemediationComplexity.map(complexity =>
                                <option key={complexity.id} value={complexity.id}>{complexity.name}</option>
                            )}
                        </Select>
                    </label>
                    <label>Remediation priority
                        <Select name="remediation_priority" value={vulnerability.remediation_priority || ""} onChange={onFormChange} required>
                            {RemediationPriority.map(priority =>
                                <option key={priority.id} value={priority.id}>{priority.name}</option>
                            )}
                        </Select>
                    </label>
                </AccordionPanel>
            </AccordionItem>

            {
                !vulnerability.is_template && <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box flex="1" textAlign="left">
                                Relations
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>

                        <label>Project
                            <Select name="project_id" value={vulnerability.project_id || ""} onChange={onFormChange} required>
                                {projects && projects.map((project, index) =>
                                    <option key={index} value={project.id}>{project.name}</option>
                                )}
                            </Select>
                        </label>

                        <label>Affected target
                            <Select name="target_id" value={vulnerability.target_id || ""} onChange={onFormChange}>
                                <option value="0">(none)</option>
                                {targets && targets.map((target, index) =>
                                    <option key={index} value={target.id}>{target.name}</option>
                                )}
                            </Select>
                        </label>
                    </AccordionPanel>
                </AccordionItem>
            }
        </Accordion>

        <Primary type="submit">{isEditForm ? "Save" : "Add"}</Primary>
    </form >
}

export default VulnerabilityForm;
