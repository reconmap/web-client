import ReactTimeAgo from "react-time-ago/commonjs/ReactTimeAgo";

const TimestampsSection = ({ entity }) => {
    return <>
        <h4>Timestamps</h4>
        <dl>
            <dt>Created</dt>
            <dd><ReactTimeAgo date={entity.insert_ts} /></dd>

            {entity.update_ts && <>
                <dt>Updated</dt>
                <dd><ReactTimeAgo date={entity.update_ts} /></dd>
            </>}
        </dl>
    </>
}

export default TimestampsSection;
