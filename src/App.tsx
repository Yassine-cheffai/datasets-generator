import { Button, Col, DatePicker, Input, Row, Select, Switch, Typography, notification } from 'antd';
import React , { useState, useEffect } from 'react';
import './App.css';


const { Title, Link} = Typography;
const { Option } = Select;

const children = [<Option key={"1"} value="1">1</Option>,
                  <Option key={"2"} value="2">2</Option>,];

const App = () => {

    const [keywords, setKeywords] = useState("");
    const [fields, setFields] = useState(['a10', 'c12']) // same default as the input
    const [since, setSince] = useState("");
    const [semantic, setSemantic] = useState(false);
    const [retweets, setRetweets] = useState(false);
    const [removeUrls, setremoveUrls] = useState(false);
    const [notify, ] = useState(true)
    console.log(keywords, fields, since, semantic, retweets, removeUrls);

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
                    defaultValue={['a10', 'c12']}
                    onChange={event => setFields(event)}>
                    {children}
                </Select>
            </Col>
        </Row>
        <Row>
            <Col span={8} offset={8} style={{ padding: '8px 0' }}>
                <DatePicker style={{ width: '100%' }}
                            placeholder="since"
                            onChange={ date => date ? setSince(date.format("DD-MM-YYYY")) : "" } />
            </Col>
        </Row>
        <Row>
            <Col span={8} offset={8} style={{ padding: '8px 0' }}>
                <Switch onChange={ event => setSemantic(event) } /> Add semantic analyse
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
              <Button type="primary" htmlType="submit">
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
