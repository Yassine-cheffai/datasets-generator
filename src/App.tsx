import { Button, Col, DatePicker, Input, Row, Select, Switch, Typography, notification } from 'antd';
import React from 'react';
import './App.css';


const { Title, Link} = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

const children = [<Option key={"1"} value="1">1</Option>,
<Option key={"2"} value="2">2</Option>,];

const App = () => {
    
    notification.open({
    message: 'What is twitter datasets builder ?',
    description:
      'Twitter datasets builder is a tool for extracting tweets data from twitter, this tool is designed mainly to help data scientists who are working on NLP and NLU',
    duration: 0,
    placement: 'bottomRight',
    });

    return (
      <div>
        <Row>
            <Col span={8} offset={8}>
                <Title level={3} style={{ marginTop: "20px", marginBottom: "80px", textAlign: "center"}}>Twitter DataSets Builder</Title>
            </Col>
        </Row>
        <Row>
            <Col span={8} offset={8} style={{ padding: '8px 0' }}>
                <Input placeholder="Keywords" />
            </Col>
        </Row>
        <Row>
            <Col span={8} offset={8} style={{ padding: '8px 0' }}>
                <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Please select fields"
                    defaultValue={['a10', 'c12']}>
                    {children}
                </Select>
            </Col>
        </Row>
        <Row>
            <Col span={8} offset={8} style={{ padding: '8px 0' }}>
                <RangePicker style={{ width: '100%' }}/>
            </Col>
        </Row>
        <Row>
            <Col span={8} offset={8} style={{ padding: '8px 0' }}>
                <Switch /> Add semantic analyse
            </Col>
        </Row>
        <Row>
            <Col span={8} offset={8} style={{ padding: '8px 0' }}>
                <Switch /> Retweets
            </Col>
        </Row>
        <Row>
            <Col span={8} offset={8} style={{ padding: '8px 0' }}>
                <Switch /> Remove urls
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
