
const StageConfigurations = {
    dev: {
        api: {
            baseUrl: 'http://localhost:8080'
        }
    },
    prod: {
        api: {
            baseUrl: 'https://api.reconmap.org'
        }
    },
}

const Configuration = StageConfigurations[process.env.REACT_APP_STAGE === 'prod' ? 'prod' : 'dev'];

export default Configuration;
