import { Typography, Tabs, notification } from 'antd';
import React, { useState, useEffect } from 'react';
import { Twitter } from './twitter';
import { Reddit } from './reddit';
import './App.css';

const { Title, Link } = Typography;
const { TabPane } = Tabs;


const App = () => {
    const [notify,] = useState(true);
    useEffect(() => {
        notification.open({
            message: 'What is Datasets Generator ?',
            description:
                'Datasets Generator is a tool for extracting informations from different social media platfroms, this tool is designed mainly to help data scientists who are working on NLP and NLU',
            duration: 0,
            placement: 'bottomRight',
        });
    }, [notify]
    );
    return (
        <div>
            <div style={{ margin: "100px", width: "50%" }}>
                <Tabs type="card">
                    <TabPane tab="Twitter" key="1">
                        <Twitter />
                    </TabPane>
                    <TabPane tab="Reddit" key="2">
                        <Reddit />
              </TabPane>
                    <TabPane tab="Quora" key="3">
                        Content of Tab Pane 3
              </TabPane>
                </Tabs>
            </div>
            <div>
                <Title code style={{
                    position: "absolute",
                    bottom: "0",
                    width: "100%",
                    textAlign: "center",
                    fontSize: "14px"
                }}>
                    Developed by&nbsp;
                <Link href="https://github.com/Yassine-cheffai" target="_blank">
                        Yassine Cheffai
                </Link>
                </Title>
            </div>
        </div>

    );
};

export default App;
