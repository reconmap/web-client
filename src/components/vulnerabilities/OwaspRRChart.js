import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';


const OwaspRRRadarChart = () => {



    const RISKS = {
        'none': { label: 'None', color: '#f3f3f3' },
        'low': { label: 'Low', color: 'var(--green)' },
        'medium': { label: 'Medium', color: 'var(--yellow)' },
        'high': { label: 'High', color: 'var(--purple)' },
        'critical': { label: 'Critical', color: 'var(--primary-color)' }
    };

    const data = [
        {
          subject: 'Skills required',
          A: 7,
          fullMark: 10,
        },
        {
          subject: 'Motive',
          A: 3,
          fullMark: 10,
        },
        {
          subject: 'Opportunity',
          A: 0,
          fullMark: 10,
        },
        {
            subject: 'Population size',
            A: 0,
            fullMark: 10,
          },
          {
            subject: 'Ease of discovery',
            A: 0,
            fullMark: 10,
          },
          {
            subject: 'Ease of exploit',
            A: 0,
            fullMark: 10,
          },
          {
            subject: 'Awareness',
            A: 0,
            fullMark: 10,
          },
          {
            subject: 'Intrusion detection',
            A: 0,
            fullMark: 10,
          },
          {
            subject: 'Loss of confidentiality',
            A: 0,
            fullMark: 10,
          },
          {
            subject: 'Loss of integrity',
            A: 0,
            fullMark: 10,
          },
          {
            subject: 'Loss of availability',
            A: 0,
            fullMark: 10,
          },
          {
            subject: 'Loss of accountability',
            A: 0,
            fullMark: 10,
          },
          {
            subject: 'Financial damage',
            A: 0,
            fullMark: 10,
          },
          {
            subject: 'Reputation damage',
            A: 0,
            fullMark: 10,
          },
          {
            subject: 'Non-compliance',
            A: 0,
            fullMark: 10,
          },
          {
            subject: 'Privacy violation',
            A: 0,
            fullMark: 10,
          },
      ];

    return <RadarChart outerRadius={180} width={900} height={550} data={data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={90} domain={[0, 10]} />
                <Radar name="Mike" dataKey="A" stroke={RISKS["critical"].color} fill={RISKS["critical"].color} fillOpacity={0.7} />
            </RadarChart>;
}
export default OwaspRRRadarChart;
