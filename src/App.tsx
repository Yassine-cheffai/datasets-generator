import { Button, Col, DatePicker, Input, Row, Select, Switch, Typography, notification } from 'antd';
import React , { useState, useEffect } from 'react';
import './App.css';


const { Title, Link} = Typography;
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
    const [notify, ] = useState(true)

    useEffect(() => {
        notification.open({
        message: 'What is twitter datasets builder ?',
        description:
          'Twitter datasets builder is a tool for extracting tweets data from twitter, this tool is designed mainly to help data scientists who are working on NLP and NLU',
        duration: 0,
        placement: 'bottomRight',
        });
      }, [notify]

    )

    const submit = () => {
      console.log(keywords, fields, since, polarity, retweets, removeUrls);
    }

    return (
      <div>
        <Row>
            <Col span={8} offset={8}>
                <Title level={3} style={{ marginTop: "20px",
                                          marginBottom: "80px",
                                          textAlign: "center" }}>
                                          Twitter DataSets Builder
                </Title>
            </Col>
        </Row>
        <Row>
            <Col span={8} offset={8} style={{ padding: '8px 0' }}>
                <Input placeholder="Keywords" onChange={ event => setKeywords(event.target.value) }/>
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
                            onChange={ date => date ? setSince(date.format("YYYY-MM-DD")) : "" } />
            </Col>
        </Row>
        <Row>
            <Col span={8} offset={8} style={{ padding: '8px 0' }}>
                <Switch onChange={ event => setpolarity(event) } /> Add polarity analyse
            </Col>
        </Row>
        <Row>
            <Col span={8} offset={8} style={{ padding: '8px 0' }}>
                <Switch onChange={ event => setRetweets(event) } /> Retweets
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
                      onClick={ submit }>
                      Submit
              </Button>
            </Col>
        </Row>
        <div>
          <Title code style={{ position:"absolute", 
                               bottom:"0",
                               width:"100%",
                               textAlign: "center",
                               fontSize: "14px"}}>
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
