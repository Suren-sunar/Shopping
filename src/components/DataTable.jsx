import { useEffect } from "react"
import { useState } from "react"
import { Col, Form, Pagination, Row, Table } from "react-bootstrap"
import moment from "moment"

export const DataTable = ({data, searchable = [], sortable = []}) => {
    const [all, setAll] = useState([])
    const [filtered, setFiltered] = useState([])
    const [term, setTerm] = useState('')
    const [sortBy, setSortBy] = useState('')
    const [order, setOrder] = useState('desc')
    const [paginated, setPaginated] = useState([])
    const [current, setCurrent] = useState(1)
    const [pages, setPages] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [offset, setOffset] = useState(0)
    const [pageLinks, setPageLinks] = useState([])

    useEffect(() => {
        setAll(data)
    }, [data])

    useEffect(() => {
        setFiltered(all)
    }, [all])

    useEffect(() => {
        if(term.length) {
            let temp = data.filter(item => {
                for(let k in item) {
                    if (searchable.includes(k) && `${item[k]}`.toLowerCase().includes(term.toLowerCase())) {
                        return true
                    }
                }
                
                return false
            })

            setFiltered(temp)
        } else {
            setFiltered(data)
        }

        setSortBy('')
        setOrder('desc')
        setCurrent(1)
    }, [term])

    useEffect(() => {
        let k = sortBy
        let temp = [...filtered].sort((a, b) => {
            if(isNaN(parseFloat(a[k])) && isNaN(parseFloat(b[k]))) {
                if(moment(a[k]).isValid() && moment(b[k]).isValid()) {
                    moment(a[k]).unix() - moment(b[k]).unix()
                } else {
                    let x = a[k].toLowerCase()
                    let y = b[k].toLowerCase()
                    if (x < y) { return -1 }
                    if (x > y) { return 1 }
                    return 0
                }
            } else {
                return a[k] - b[k]
            }
        })

        if(order == 'desc') {
            temp.reverse()
        }

        setFiltered(temp)
        setCurrent(1)
    }, [sortBy, order])

    useEffect(() => {
        let temp = current * (perPage - 1)
        setOffset(temp)
    }, [current, perPage])

    useEffect(() => {
        let temp = [...filtered]
        if (filtered.length > perPage) {
            temp = temp.splice(offset, perPage)
        }

        setPaginated(temp)
    }, [offset, filtered])

    useEffect(() => {
        let temp = Math.ceil(filtered.length / perPage)

        setPages(temp)
    }, [filtered, perPage])

    useEffect(() => {
        let temp = []

        for(let i = 1; i <= pages; i++) {
            temp.push(<Pagination.Item key={i} active={i == current} onClick={() => setCurrent(i)}>{i}</Pagination.Item>)
        }

        setPageLinks(temp)
    }, [pages, current])

    const handleClick = k => {
        if(sortable.includes(k)) {
            if(k == sortBy) {
                setOrder(order == 'asc' ? 'desc' : 'asc')
            } else {
                setSortBy(k)
                setOrder('desc')
            }
        }
    }

    const handleChange = ({target}) => {
        let temp = parseInt(target.value)

        setPerPage(temp)
        setCurrent(1)
    }

    return <Row>
        <Col>
            <Row>
                <Col xs="auto">Per Page</Col>
                <Col xs="auto">
                    <Form.Select defaultValue={perPage} onChange={handleChange}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </Form.Select>
                </Col>
            </Row>
        </Col>
        {searchable.length && <Col lg={4} className="ms-auto mb-3">
            <Form.Control type="search" name="term" id="term" placeholder="Search..." defaultValue={term} onChange={({target})=> setTerm(target.value)} />    
        </Col>}
        <Col xs={12}>
            {paginated.length ? <Table size="sm" striped hover>
                <thead className="table-dark">
                    <tr>
                        {Object.keys(paginated[0]).map((k, i) => 
                            <th key={i} className={sortable.includes(k) && 'sortable'} onClick={() => handleClick(k)}>
                                {k}{sortBy == k && <i className={`bi-chevron-${order == 'asc' ? 'up' : 'down'} ms-2`}></i>}
                            </th>)}
                    </tr>
                </thead>
                <tbody>
                    {paginated.map((item, i) => <tr key={i}>
                        {Object.keys(item).map((k, j) => <td key={j}>{item[k]}</td>)}
                    </tr>)}
                </tbody>
            </Table> : <h4 className="fst-italic text-muted text-center">No data found</h4>}
            {pages > 1 && <Pagination>
                <Pagination.Prev disabled={current == 1} onClick={() => setCurrent(current - 1)} />
                {pageLinks.map(link => link)}
                <Pagination.Next disabled={current == pages} onClick={() => setCurrent(current + 1)} />
            </Pagination>}
        </Col>
    </Row>
}