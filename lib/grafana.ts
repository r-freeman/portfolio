import fetcher from '@/lib/fetcher'

const GRAFANA_URL = process.env.GRAFANA_URL
const GRAFANA_TOKEN = process.env.GRAFANA_TOKEN

export const getTemp = async () => {
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
                    "maxDataPoints": 100
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

export const getRootFsUsage = async () => {
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
                    "expr": "100 - ((node_filesystem_avail_bytes{mountpoint='/',fstype!='rootfs'} * 100) / node_filesystem_size_bytes{mountpoint='/',fstype!='rootfs'})",
                    "maxDataPoints": 100
                }
            ],
            "from": "now-5m",
            "to": "now"
        })
    })

    return {
        usage: response.results.A.frames[0].data.values[1][15].toFixed(2)
    }
}

export const getUptime = async () => {
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
                    "expr": "node_time_seconds - node_boot_time_seconds",
                    "maxDataPoints": 100
                }
            ],
            "from": "now-5m",
            "to": "now"
        })
    })

    const seconds = response.results.A.frames[0].data.values[1][15]
    const minutes = (seconds / 60).toFixed(2)
    const hours = (seconds / 3_600).toFixed(2)
    const weeks = (seconds / 604_800).toFixed(2)

    return {
        seconds: (seconds).toFixed(2),
        minutes,
        hours,
        weeks
    }
}