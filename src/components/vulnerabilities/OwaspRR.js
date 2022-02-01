import Select from "react-select"
import { useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

const  OwaspRR = () => {
    const risk_colors = {
        'none': { label: 'None', color: '#f3f3f3' },
        'low': { label: 'Low', color: 'var(--green)' },
        'medium': { label: 'Medium', color: 'var(--yellow)' },
        'high': { label: 'High', color: 'var(--purple)' },
        'critical': { label: 'Critical', color: 'var(--primary-color)' }
    };

    let owaspRRChartData = [
        { subject: 'Skills required', value: 1, id: "owasp_skills" },
        { subject: 'Motive', value: 1, id: "owasp_motive" },
        { subject: 'Opportunity', value: 0, id: "owasp_opportunity" },
        { subject: 'Population size', value: 2, id: "owasp_size" },
        { subject: 'Ease of discovery', value: 1, id: "owasp_discovery" },
        { subject: 'Ease of exploit', value: 1, id: "owasp_exploit" },
        { subject: 'Awareness', value: 1, id: "owasp_awareness" },
        { subject: 'Intrusion detection', value: 1, id: "owasp_intrusion" },
        { subject: 'Loss of confidentiality', value: 2, id: "owasp_confidentiality" },
        { subject: 'Loss of integrity', value: 1, id: "owasp_integrity" },
        { subject: 'Loss of availability', value: 1, id: "owasp_availability" },
        { subject: 'Loss of accountability', value: 1, id: "owasp_accountability" },
        { subject: 'Financial damage', value: 1, id: "owasp_financial" },
        { subject: 'Reputation damage', value: 1, id: "owasp_reputation" },
        { subject: 'Non-compliance', value: 2, id: "owasp_compliance" },
        { subject: 'Privacy violation', value: 3, id: "owasp_privacy" },
      ];
    
    const [test, setTest] = useState(owaspRRChartData)

    const OwaspChart = () => (
        <RadarChart outerRadius={180} width={900} height={550} data={test}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={90} domain={[0, 10]} />
            <Radar name="OWASP Risk Rating" dataKey="value" stroke={risk_colors["critical"].color} fill={risk_colors["critical"].color} fillOpacity={0.7} />
        </RadarChart>
    )

    const skillLevelOptions = [
        { value: 1, label: '1 - No technical skills' },
        { value: 3, label: '3 - Some technical skills' },
        { value: 5, label: '5 - Advanced computer user' },
        { value: 6, label: '6 - Network and programming skills' },
        { value: 9, label: '9 - Security penetration skills' }
      ]

    const motiveOptions = [
        { value: 1, label: '1 - Low or no reward' },
        { value: 4, label: '4 - Possible reward' },
        { value: 9, label: '9 - High reward' }
      ]

    const opportunityOptions = [
        { value: 0, label: '0 - Full access or expensive resources required ' },
        { value: 4, label: '4 - Special access or resources required' },
        { value: 7, label: '7 - Some access or resources required' },
        { value: 9, label: '9 - No access or resources required' }
      ]

    const sizeOptions = [
        { value: 2, label: '2 - Developers, System administrators' },
        { value: 4, label: '4 - Intranet users' },
        { value: 5, label: '5 - Partners' },
        { value: 6, label: '6 - Authenticated users' },
        { value: 9, label: '9 - Anonymous Internet users' }
      ]

     const updateChart = (event, id) => {
        owaspRRChartData.map(data => {
            if (data.id === id) {
              data.value = event.value
            }
        });
        setTest(owaspRRChartData);
    };

    const ThreatAgentFactors = () => (
        <div>
            <h6>Threat agent factors</h6>
            <label>Skill level
                <Select options={skillLevelOptions} onChange={e => updateChart(e, "owasp_skills")} />
            </label>
            <label>Motive
                <Select options={motiveOptions} onChange={e => updateChart(e, "owasp_motive")} />
            </label>
            <label>Opportunity
                <Select options={opportunityOptions} onChange={e => updateChart(e, "owasp_opportunity")} />
            </label>
            <label> Size
                <Select options={sizeOptions} onChange={e => updateChart(e, "owasp_size")} />
            </label>
        </div>
    )

    const lossOfConfidentialityOptions = [
        { value: 2, label: '2 - Minimal non-sensitive data disclosed' },
        { value: 6, label: '6 - Minimal critical data disclosed' },
        { value: 6, label: '6 - Extensive non-sensitive data disclosed' },
        { value: 7, label: '7 - Extensive critical data disclosed' },
        { value: 9, label: '9 - All data disclosed' }
      ]

      const lossOfIntegrityOptions = [
        { value: 1, label: '1 - Minimal slightly corrupt data' },
        { value: 3, label: '3 - Minimal seriously corrupt data' },
        { value: 5, label: '5 - Extensive slightly corrupt data' },
        { value: 7, label: '7 - Extensive seriously corrupt data ' },
        { value: 9, label: '9 - All data totally corrupt' }
      ]

      const lossOfAvailabilityOptions = [
        { value: 1, label: '1 - Minimal secondary services interrupted' },
        { value: 5, label: '5 - Minimal primary services interrupted' },
        { value: 5, label: '5 - Extensive secondary services interrupted' },
        { value: 7, label: '7 - Extensive primary services interrupted' },
        { value: 9, label: '9 - All services completely lost' }
      ]

      const lossOfAccountabilityOptions = [
        { value: 1, label: '1 - Fully traceable' },
        { value: 7, label: '7 - Possibly traceable' },
        { value: 9, label: '9 - Completely anonymous' }
      ]

    const TechnicalImpactFactors = () => (
        <div>
            <h6>Technical impact factors</h6>
            <label>Loss of confidentiality
                <Select options={lossOfConfidentialityOptions} onChange={e => updateChart(e, "owasp_confidentiality")} />
            </label>
            <label>Loss of integrity
                <Select options={lossOfIntegrityOptions} onChange={e => updateChart(e, "owasp_integrity")} />
            </label>
            <label>Loss of availability
                <Select options={lossOfAvailabilityOptions} onChange={e => updateChart(e, "owasp_availability")} />
            </label>
            <label> Loss of accountability
                <Select options={lossOfAccountabilityOptions} onChange={e => updateChart(e, "owasp_accountability")} />
            </label>
        </div>
    )

    const easeOfDiscoveryOptions = [
        { value: 1, label: '1 - Practically impossible ' },
        { value: 3, label: '3 - Difficult' },
        { value: 7, label: '7 - Easy' },
        { value: 9, label: '9 - Automated tools available' }
      ]

      const easeOfExploitOptions = [
        { value: 1, label: '1 - Theoretical' },
        { value: 3, label: '3 - Difficult' },
        { value: 5, label: '5 - Easy' },
        { value: 9, label: '9 - Automated tools available' }
      ]

      const awarenessOptions = [
        { value: 1, label: '1 - Unknown' },
        { value: 4, label: '4 - Hidden' },
        { value: 6, label: '6 - Obvious' },
        { value: 9, label: '9 - Public knowledge' }
      ]

      const intrusionDetectionOptions = [
        { value: 1, label: '1 - Active detection in application' },
        { value: 3, label: '3 - Logged and reviewed' },
        { value: 8, label: '8 - Logged without review' },
        { value: 9, label: '9 - Not logged' }
      ]

      const VulnerabilityFactors = () => (
        <div>
            <h6>Vulnerability factors</h6>
            <label>Ease of discovery
                <Select options={easeOfDiscoveryOptions} onChange={e => updateChart(e, "owasp_discovery")} />
            </label>
            <label>Ease of exploit
                <Select options={easeOfExploitOptions} onChange={e => updateChart(e, "owasp_exploit")} />
            </label>
            <label>Awareness
                <Select options={awarenessOptions} onChange={e => updateChart(e, "owasp_awareness")} />
            </label>
            <label>Intrusion detection
                <Select options={intrusionDetectionOptions} onChange={e => updateChart(e, "owasp_intrusion")} />
            </label>
        </div>
    )

    const financialDamageOptions = [
        { value: 1, label: '1 - Less than the cost to fix the vulnerability' },
        { value: 3, label: '3 - Minor effect on annual profit' },
        { value: 7, label: '7 - Significant effect on annual profit' },
        { value: 9, label: '9 - Bankruptcy' }
      ]

      const reputationDamageOptions = [
        { value: 1, label: '1 - Minimal damage' },
        { value: 4, label: '4 - Loss of major accounts' },
        { value: 5, label: '5 - Loss of goodwill' },
        { value: 9, label: '9 - Brand damage' }
      ]

      const nonComplianceOptions = [
        { value: 2, label: '2 - Minor violation' },
        { value: 5, label: '5 - Clear violation' },
        { value: 7, label: '7 - High profile violation' }
      ]

      const privacyViolationOptions = [
        { value: 3, label: '3 - One individual' },
        { value: 5, label: '5 - Hundreds of people' },
        { value: 7, label: '7 - Thousands of people' },
        { value: 9, label: '9 - Millions of people' }
      ]

      const BusinessImpactFactors = () => (
        <div>
            <h6>Business impact factors</h6>
            <label>Financial damage
                <Select options={financialDamageOptions} onChange={e => updateChart(e, "owasp_financial")} />
            </label>
            <label>Reputation damage
                <Select options={reputationDamageOptions} onChange={e => updateChart(e, "owasp_reputation")} />
            </label>
            <label>Non-compliance
                <Select options={nonComplianceOptions} onChange={e => updateChart(e, "owasp_compliance")} />
            </label>
            <label>Privacy violation
            <Select options={privacyViolationOptions} onChange={e => updateChart(e, "owasp_privacy")} />
            </label>
        </div>
    )


    return (
        <div>
            <OwaspChart />
            <ThreatAgentFactors />
            <VulnerabilityFactors />
            <TechnicalImpactFactors />
            <BusinessImpactFactors />
        </div>
      ); 

}

export default OwaspRR;