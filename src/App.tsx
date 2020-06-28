import { Button, Col, DatePicker, Input, Row, Select, Switch, Typography } from 'antd';
import React from 'react';
import './App.css';


const { Title } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

const children = [<Option key={"1"} value="1">1</Option>,
<Option key={"2"} value="2">2</Option>,];

const App = () => {

    return (
      <div style={{ marginTop: "100px"}}>
        <Row>
            <Col span={8} offset={8}>
                <Title level={3} style={{ marginTop: "20px", marginBottom: "100px", textAlign: "center"}}>Twitter DataSets Builder</Title>
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
                <RangePicker />
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
      </div>

    );
};

export default App;
