import { Button } from "@chakra-ui/react";
import NativeCheckbox from "components/form/NativeCheckbox";
import NativeInput from "components/form/NativeInput";
import PageTitle from "components/logic/PageTitle";
import useFetch from "hooks/useFetch";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../ui/Breadcrumb";
import { IconSearch } from "../ui/Icons";
import Title from "../ui/Title";
import SearchUrls from "./SearchUrls";

const entityList = {
    commands: "Commands",
    tasks: "Tasks",
    vulnerabilities: "Vulnerabilities",
    vulnerability_templates: "Vulnerability templates",
    projects: "Projects",
    project_templates: "Project templates",
};

const AdvancedSearch = () => {
    const navigate = useNavigate();

    const [keywords, setKeywords] = useState("");
    const [entities, setEntities] = useState(Object.keys(entityList));
    const [recentSearches] = useFetch("/recent-searches");

    const onFormSubmit = (ev) => {
        ev.preventDefault();

        navigate(`/search/${keywords.trim()}?entities=` + entities.join(","));
    };

    const onKeywordsChange = (ev) => {
        setKeywords(ev.target.value);
    };

    const onFormInputChange = (ev) => {
        const target = ev.target;
        const value = target.value;

        setEntities(
            target.checked
                ? [...entities, value]
                : entities.filter((entity) => entity !== value),
        );
    };

    return (
        <>
            <PageTitle value={`Advanced search`} />
            <div className="heading">
                <Breadcrumb />
            </div>

            <h3>Recent searches</h3>
            {recentSearches === null ? (
                <>No searches.</>
            ) : (
                <ol>
                    {recentSearches.map((search) => (
                        <li>
                            <Link
                                to={SearchUrls.KeywordsSearch.replace(
                                    ":keywords",
                                    search,
                                )}
                            >
                                {search}
                            </Link>
                        </li>
                    ))}
                </ol>
            )}
            <Title
                type="Advanced search"
                title="Search form"
                icon={<IconSearch />}
            />

            <form onSubmit={onFormSubmit}>
                <NativeInput
                    type="search"
                    name="keywords"
                    value={keywords}
                    onChange={onKeywordsChange}
                    placeholder="Keywords..."
                    autoFocus
                />

                {Object.keys(entityList).map((objectKey) => (
                    <NativeCheckbox
                        checked={entities.includes(objectKey)}
                        value={objectKey}
                        onChange={onFormInputChange}
                    >
                        {entityList[objectKey]}
                    </NativeCheckbox>
                ))}

                <Button
                    type="submit"
                    isDisabled={
                        keywords.trim().length === 0 || entities.length === 0
                    }
                >
                    Search
                </Button>
            </form>
        </>
    );
};

export default AdvancedSearch;
