import { Button, Col, Input, Row, Select, Switch, Alert, Popover } from 'antd';
import { DownloadOutlined, InfoCircleOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { CSVLink } from "react-csv";
import axios from 'axios';

const { Option } = Select;

// lang, created_at, author.screen_name, text, retweet_count
const children = [<Option key={"lang"} value="lang">Language</Option>,
<Option key={"created_at"} value="created_at">Creation time</Option>,
<Option key={"author"} value="author">Author</Option>,
<Option key={"text"} value="text">Content</Option>,
<Option key={"retweet_count"} value="retweet_count">Retweet count</Option>,];


export const Twitter = () => {
    const [keywords, setKeywords] = useState("");
    const [fields, setFields] = useState(['text',]) // same default as the input => lang, created_at, author.screen_name, text, retweet_count
    const [polarity, setpolarity] = useState(false);
    const [retweets, setRetweets] = useState(false);
    const [removeUrls, setremoveUrls] = useState(false);
    const [isLoading, setisLoading] = useState(false);
    const [isReady, setisReady] = useState(false);
    const [csvData, setcsvData] = useState([]);
    const [displayError, setdisplayError] = useState(false)
    const [errorMessage, seterrorMessage] = useState("")

    const submit = () => {
        if (keywords === "" ||
            fields.length === 0
        ) {
            seterrorMessage("Please verify your inputs");
            setdisplayError(true);
            return
        }
        setisLoading(true)
        axios.post((process.env.REACT_APP_BACKEND ? process.env.REACT_APP_BACKEND : "http://127.0.0.1:8000") + "twitter/", {
            keywords: keywords,
            csv_fields: fields,
            polarity: polarity,
            retweets: retweets,
            remove_urls: removeUrls
        })
            .then(res => {
                setcsvData(res.data.result);
                setisLoading(false);
                setisReady(true);
            })
            .catch(error => {
                seterrorMessage("Oooups something went wrong");
                setdisplayError(true);
                setisLoading(false);
            })
    };

    const popoverContent = <p>
        <b>Sentiment analysis</b> is a method of identifying attitudes in text data about a subject of interest. It is scored using <b>polarity</b> values that range from 1 to -1.
    <br />
    Values closer to 1 indicate more positivity, while values closer to -1 indicate more negativity
  </p>

    return (
        <div>
            {displayError ?
                <Row>
                    <Col>
                        <Alert
                            message={errorMessage}
                            type="error"
                            closable
                            onClose={(event) => (setdisplayError(false))} />
                    </Col>
                </Row>
                :
                ""
            }
            <Row>
                <Col style={{ padding: '8px 0', width: "100%" }}>
                    <Input placeholder="Keywords" onChange={event => setKeywords(event.target.value)} />
                </Col>
            </Row>
            <Row>
                <Col style={{ padding: '8px 0', width: "100%" }}>
                    <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="Please select fields"
                        defaultValue={['text']}
                        onChange={event => setFields(event)}>
                        {children}
                    </Select>
                </Col>
            </Row>
            <Row>
                <Col style={{ padding: '8px 0' }}>
                    <Switch onChange={event => setpolarity(event)} /> Add Sentiment analysis
                    <Popover content={popoverContent} trigger="click">
                        <InfoCircleOutlined style={{ marginLeft: "5px" }} />
                    </Popover>
                </Col>
            </Row>
            <Row>
                <Col style={{ padding: '8px 0' }}>
                    <Switch onChange={event => setRetweets(event)} /> Retweets
          </Col>
            </Row>
            <Row>
                <Col style={{ padding: '8px 0' }}>
                    <Switch onChange={event => setremoveUrls(event)} /> Remove urls
          </Col>
            </Row>
            <Row>
                <Col style={{ padding: '8px 0' }}>
                    <Button type="primary"
                        htmlType="submit"
                        onClick={submit}
                        loading={isLoading}>
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
