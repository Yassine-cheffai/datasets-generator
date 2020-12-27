import React, { useState } from 'react';
import { Row, Col, Select, Input, Button} from 'antd';
import axios from 'axios'
import { CSVLink } from "react-csv";
import { DownloadOutlined } from '@ant-design/icons';

const { Option } = Select;
const children = [
    <Option key={"title"} value="title">Submission Title</Option>,
    <Option key={"author"} value="author">Author</Option>,
    <Option key={"created_utc"} value="created_utc">Creation Date (utc)</Option>,
    <Option key={"num_comments"} value="num_comments">Number of comments</Option>,
    <Option key={"selftext"} value="selftext">Sumission Content</Option>,
                  ];
export const Reddit = () => {
    const [searchType, setsearchType] = useState("specific_subreddit");
    const [keywords, setKeywords] = useState("");
    const [csvData, setcsvData] = useState([]);
    const [isReady, setisReady] = useState(false);
    const [isLoading, setisLoading] = useState(false);
    const [fields, setFields] = useState(['title', ]);

    const submit = () => {
        setisLoading(true);
        axios.post((process.env.REACT_APP_BACKEND ? process.env.REACT_APP_BACKEND : "http://127.0.0.1:8000") + "reddit/", {
            keywords: keywords,
            search_type: searchType,
            csv_fields: fields,
        }
        )
             .then(res => {
                 setcsvData(res.data.result)
                 setisReady(true);
                 setisLoading(false);
             })
             .catch(error => {
                 console.log(error);
                 setisLoading(false);
             })
    }
    return (
        <div>
            <Row>
                <Col style={{ padding: "8px 0", width: "100%"}}>
                <Select defaultValue="specific_subreddit" style={{ width: 350 }} onChange = {(value) => {setsearchType(value); setKeywords("")}}>
                    <Option value="specific_subreddit">Specific Subreddit Submissions</Option>
                    <Option value="all_subreddits">All Submissions</Option>
                </Select>
                </Col>
            </Row>
            <Row>
                <Col style={{ padding: "8px 0", width: "100%"}}>
                <Input placeholder={searchType === "specific_subreddit" ? "Subreddit Name" : "Keywords"}
                       onChange={(event) => {setKeywords(event.target.value);}}
                       value={keywords}
                />
                </Col>
            </Row>
            <Row>
                <Col style={{ padding: '8px 0', width: "100%" }}>
                    <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="Please select fields"
                        defaultValue={['title']}
                        onChange={event => setFields(event)}>
                        {children}
                    </Select>
                </Col>
            </Row>
            <Row>
                <Col style={{ padding: "8px 0", width: "100%" }}>
                <Button type="primary"
                        htmlType="submit"
                        loading={isLoading}
                        onClick={submit}>
                    Submit
                </Button>
                </Col>
            </Row>
            <Row>
                <Col style={{ padding: '15px 0' }}>
                    {isReady ?
                     <div>
                         Your CSV file is Ready ! <CSVLink data={csvData} filename={keywords + ".csv"}>
                         <Button type="primary" icon={<DownloadOutlined />} size="small">Download</Button>
                         </CSVLink>
                     </div>
                    :
                     ""
                    }
                </Col>
            </Row>
        </div>
    )
}
