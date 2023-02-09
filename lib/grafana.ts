import fetcher from '@/lib/fetcher'

const GRAFANA_URL = process.env.GRAFANA_URL
const GRAFANA_TOKEN = process.env.GRAFANA_TOKEN

export const getPiTemp = async () => {
    const response = await fetcher(GRAFANA_URL, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${GRAFANA_TOKEN}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "queries": [
                {
                    "datasource": {
                        "uid": "4f-R6jgRz",
                        "type": "prometheus"
                    },
                    "expr": "node_hwmon_temp_celsius",
                    "maxDataPoints": 612
                }
            ],
            "from": "now-5m",
            "to": "now"
        })
    })

    return {
        temp: response.results.A.frames[0].data.values[1][15].toFixed(2)
    }
}