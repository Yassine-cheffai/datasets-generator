import { Button, Col, DatePicker, Input, Row, Select, Switch } from 'antd';
import React from 'react';
import './App.css';



const { Option } = Select;
const { RangePicker } = DatePicker;

const children = [<Option key={"1"} value="1">1</Option>,
<Option key={"2"} value="2">2</Option>,];

const App = () => {

    return (
        <Row justify="center">
            <Col span={24}>
                <Input placeholder="Keywords" />
                <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Please select fields"
                    defaultValue={['a10', 'c12']}>
                    {children}
                </Select>
                <RangePicker />
                <Switch /> Add semantic analyse
          <Switch /> Retweets
          <Switch /> Remove urls

            <Button type="primary" htmlType="submit">
                    Submit
            </Button>
            </Col>
        </Row>

    );
};

export default App;
