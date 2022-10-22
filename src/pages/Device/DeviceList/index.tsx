import React, { useEffect, useState, useRef } from 'react';
import { Button, Table, Tag, Col, Form, Input, Row, Select } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import defdata from './db';
import { history } from 'umi';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

const { Option } = Select;

export default function DeviceList() {
  useEffect(() => {
    console.log('start ............', defdata);
  }, []);

  const actionRef = useRef<ActionType>();

  interface DataType {
    ID: string;
    PROJECT_NAME: string;
    ORG_NAME: string;
    DEVICE_STATE: string;
  }

  const columns: ColumnsType<DataType> = [...defdata.title, ...defdata.action];

  const data: DataType[] = [...defdata.data.rows];

  const onDetails = (item: any) => {
    console.log('onDetails', item);
    history.push('/device/DeviceDetails');
  };

  columns.forEach((item) => {
    if (item.key === 'ID') {
      item.render = (id, _, index) => {
        return <div>{index + 1}</div>;
      };
    } else if (item.key === 'DEVICE_STATE') {
      item.render = (status) => {
        const colorbg = status === 1 ? 'green' : '#666';
        const statusDesc = status === 1 ? '在线' : '离线';
        return (
          <Tag color={colorbg} key={item.key}>
            {statusDesc}
          </Tag>
        );
      };
    } else if (item.key === 'PROJECT_STATE') {
      item.render = (status) => {
        console.log('render', status);
        const colorbg = status === 1 ? 'orange' : status === 2 ? 'green' : 'red';
        const statusDesc = status === 1 ? '未开始' : status === 2 ? '进行中' : '已超期';
        return (
          <div key={item.key}>
            <span style={{ color: colorbg }}> ●</span>
            {statusDesc}
          </div>
        );
      };
    } else if (item.key === 'action') {
      item.render = (action) => {
        return (
          <div key={item.key}>
            <Button
              type="link"
              onClick={() => {
                onDetails(action);
              }}
            >
              详情
            </Button>
          </div>
        );
      };
    }
  });

  const AdvancedSearchForm = () => {
    const [expand, setExpand] = useState(false);
    const [form] = Form.useForm();

    const getFields = () => {
      const children = [];
      children.push(
        <Col span={8}>
          <Form.Item
            name={`PROJECT_NAME`}
            label={`工程名字`}
            rules={[
              {
                required: true,
                message: 'Input something!',
              },
            ]}
          >
            <Input placeholder="请输入工程名字" />
          </Form.Item>
        </Col>,
        <Col span={8}>
          <Form.Item
            name={`DEVICE_STATE`}
            label={`设备状态`}
            rules={[
              {
                required: true,
                message: 'Input something!',
              },
            ]}
          >
            <Select defaultValue="2">
              <Option value="1">离线</Option>
              <Option value="2">在线</Option>
            </Select>
          </Form.Item>
        </Col>,
      );
      return children;
    };

    const onFinish = (values: any) => {
      console.log('Received values of form: ', values);
    };

    return (
      <Form
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
        onFinish={onFinish}
      >
        <Row gutter={24}>{getFields()}</Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
            <Button
              style={{ margin: '0 8px' }}
              onClick={() => {
                form.resetFields();
              }}
            >
              重置
            </Button>
            <a
              style={{ fontSize: 12 }}
              onClick={() => {
                setExpand(!expand);
              }}
            >
              {expand ? <UpOutlined /> : <DownOutlined />} 更多
            </a>
          </Col>
        </Row>
      </Form>
    );
  };

  return (
    <div>
      <AdvancedSearchForm />

      <Table ref={actionRef} columns={columns} dataSource={data} />
    </div>
  );
}
