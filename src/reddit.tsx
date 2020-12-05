import React, { useState } from 'react';
import { Row, Col, Select, Input, Button} from 'antd';
import axios from 'axios'


const { Option } = Select;
export const Reddit = () => {
    const [searchType, setsearchType] = useState("specific_subreddit");
    const [keywords, setKeywords] = useState("");
    const submit = () => {
        axios.post((process.env.REACT_APP_BACKEND ? process.env.REACT_APP_BACKEND : "http://127.0.0.1:8000") + "reddit/", {
            keywords: keywords,
            search_type: searchType,
        })
             .then(res => {
                 console.log(res);
             })
             .catch(error => {
                 console.log(error);
             })
    }
    return (
        <div>
            <Row>
                <Select defaultValue="specific_subreddit" style={{ width: 350 }} onChange = {(value) => {setsearchType(value); setKeywords("")}}>
                    <Option value="specific_subreddit">Specific Subreddit Submissions</Option>
                    <Option value="all_subreddits">All Submissions</Option>
                </Select>
            </Row>
            <Row>
                <Input placeholder={searchType === "specific_subreddit" ? "Subreddit Name" : "Keywords"}
                       onChange={(event) => {setKeywords(event.target.value);}}
                       value={keywords}
                />
            </Row>
            <Row>
                <Button type="primary"
                        htmlType="submit"
                        onClick={submit}>
                    Submit
                </Button>
            </Row>
        </div>
    )
}
