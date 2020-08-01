import { Button, Col, DatePicker, Input, Row, Select, Switch, Typography, notification, Alert, Popover } from 'antd';
import { DownloadOutlined, InfoCircleOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { CSVLink } from "react-csv";
import axios from 'axios';
import './App.css';
import moment from 'moment';

const { Title, Link } = Typography;
const { Option } = Select;

// lang, created_at, author.screen_name, text, retweet_count
const children = [<Option key={"lang"} value="lang">lang</Option>,
<Option key={"created_at"} value="created_at">created_at</Option>,
<Option key={"author"} value="author">author</Option>,
<Option key={"text"} value="text">text</Option>,
<Option key={"retweet_count"} value="retweet_count">retweet_count</Option>,];

const App = () => {

  const [keywords, setKeywords] = useState("");
  const [fields, setFields] = useState(['text',]) // same default as the input => lang, created_at, author.screen_name, text, retweet_count
  const [since, setSince] = useState("");
  const [polarity, setpolarity] = useState(false);
  const [retweets, setRetweets] = useState(false);
  const [removeUrls, setremoveUrls] = useState(false);
  const [notify,] = useState(true);
  const [isLoading, setisLoading] = useState(false);
  const [isReady, setisReady] = useState(false);
  const [csvData, setcsvData] = useState([]);
  const [displayError, setdisplayError] = useState(false)
  const [errorMessage, seterrorMessage] = useState("")

  const popoverContent = <p>
    <b>Sentiment analysis</b> is a method of identifying attitudes in text data about a subject of interest. It is scored using <b>polarity</b> values that range from 1 to -1. 
    <br/>
    Values closer to 1 indicate more positivity, while values closer to -1 indicate more negativity
  </p> 

  useEffect(() => {
    notification.open({
      message: 'What is twitter datasets builder ?',
      description:
        'Twitter datasets builder is a tool for extracting tweets data from twitter, this tool is designed mainly to help data scientists who are working on NLP and NLU',
      duration: 0,
      placement: 'bottomRight',
    });
  }, [notify]
  );

  const submit = () => {
    if (keywords === "" || 
        fields.length === 0 ||
        since === "" ||
        since > moment().format("YYYY-MM-DD")
      ){
      seterrorMessage("Please verify your inputs");
      setdisplayError(true);
      return
    }
    setisLoading(true)
    axios.post(`https://twitter-data-set-builder-api.herokuapp.com/`, {
      keywords: keywords,
      csv_fields: fields,
      since: since,
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

  return (
    <div>
      <Row>
        <Col span={8} offset={8}>
          <Title level={3} style={{
            marginTop: "20px",
            marginBottom: "80px",
            textAlign: "center"
          }}>
            Twitter DataSets Builder
          </Title>
        </Col>
      </Row>
      {displayError?
        <Row>
          <Col span={8} offset={8}>
            <Alert
              message={errorMessage}
              type="error"
              closable
              onClose={(event) => (setdisplayError(false))}/>
          </Col>
        </Row>
        :
        ""
      }
      <Row>
        <Col span={8} offset={8} style={{ padding: '8px 0' }}>
          <Input placeholder="Keywords" onChange={event => setKeywords(event.target.value)} />
        </Col>
      </Row>
      <Row>
        <Col span={8} offset={8} style={{ padding: '8px 0' }}>
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
        <Col span={8} offset={8} style={{ padding: '8px 0' }}>
          <DatePicker style={{ width: '100%' }}
            placeholder="since"
            onChange={date => date ? setSince(date.format("YYYY-MM-DD")) : ""} />
        </Col>
      </Row>
      <Row>
        <Col span={8} offset={8} style={{ padding: '8px 0' }}>
          <Switch onChange={event => setpolarity(event)} /> Add Sentiment analysis  
          <Popover content={popoverContent} trigger="click">
            <InfoCircleOutlined style={{ marginLeft: "5px" }}/>
          </Popover>
        </Col>
      </Row>
      <Row>
        <Col span={8} offset={8} style={{ padding: '8px 0' }}>
          <Switch onChange={event => setRetweets(event)} /> Retweets
            </Col>
      </Row>
      <Row>
        <Col span={8} offset={8} style={{ padding: '8px 0' }}>
          <Switch onChange={event => setremoveUrls(event)} /> Remove urls
            </Col>
      </Row>
      <Row>
        <Col span={4} offset={12} style={{ padding: '8px 0' }}>
          <Button type="primary"
            htmlType="submit"
            onClick={submit}
            loading={isLoading}>
            Submit
              </Button>
        </Col>
      </Row>
      <Row>
        <Col span={4} offset={11} style={{ padding: '15px 0' }}>
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
      <div>

        <Title code style={{
          position: "absolute",
          bottom: "0",
          width: "100%",
          textAlign: "center",
          fontSize: "14px"
        }}>
          Developed by&nbsp;
         <Link href="https://yassine-cheffai.github.io/" target="_blank">
            Yassine Cheffai
         </Link>
        </Title>
      </div>
    </div>

  );
};

export default App;
