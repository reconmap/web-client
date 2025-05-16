import RelativeDateFormatter from "./RelativeDateFormatter";

const TimestampsSection = ({ entity }) => {
    return (
        <div className="content">
            <h4>Timestamps</h4>
            <dl>
                {entity.insert_ts && (
                    <>
                        <dt>Created</dt>
                        <dd>
                            <RelativeDateFormatter date={entity.insert_ts} />
                        </dd>
                    </>
                )}
                {entity.update_ts && (
                    <>
                        <dt>Updated</dt>
                        <dd>
                            <RelativeDateFormatter date={entity.update_ts} />
                        </dd>
                    </>
                )}
            </dl>
        </div>
    );
};

export default TimestampsSection;
