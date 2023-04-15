import fetcher from '@/lib/fetcher'

const GRAFANA_URL: string = process.env.GRAFANA_URL ?? ""
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
            "from": "1681578682129",
            "to": "now"
        })
    })

    const temp = parseInt(response.results.A.frames[0].data.values[1].slice(-1))

    return {
        temp
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
            "from": "1681578682129",
            "to": "now"
        })
    })

    const rootFsUsage = parseInt(response.results.A.frames[0].data.values[1].slice(-1))

    return {
        rootFsUsage
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
            "from": "1681578682129",
            "to": "now"
        })
    })

    const seconds = parseInt(response.results.A.frames[0].data.values[1].slice(-1))
    const minutes = (seconds / 60)
    const hours = (seconds / 3_600)
    const days = (seconds / 86400)
    const weeks = (seconds / 604_800)

    return {
        seconds: (seconds),
        minutes,
        hours,
        days,
        weeks
    }
}

export const getRamUsage = async () => {
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
                    "expr": "100 - ((node_memory_MemAvailable_bytes * 100) / node_memory_MemTotal_bytes)",
                    "maxDataPoints": 100
                }
            ],
            "from": "1681578682129",
            "to": "now"
        })
    })

    const ramUsage = parseInt(response.results.A.frames[0].data.values[1].slice(-1))

    return {
        ramUsage
    }
}

export const getSysLoad = async () => {
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
                    "expr": "avg(node_load5) /  count(count(node_cpu_seconds_total) by (cpu)) * 100",
                    "maxDataPoints": 100
                }
            ],
            "from": "1681578682129",
            "to": "now"
        })
    })

    const sysLoad = parseInt(response.results.A.frames[0].data.values[1].slice(-1))

    return {
        sysLoad
    }
}