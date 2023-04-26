import React, { useState } from "react";
import type { FC } from "react";
import { Form, Input, Button, message } from "antd";
import { Space } from "antd";

const VCode: FC = () => {
  return (
    <div style={{ width: 400, margin: "100px auto" }}>
      <Form name="vcode" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
        <Form.Item label="Tel">
          <Input />
        </Form.Item>

        <Form.Item label="Code">
          <Space.Compact>
            <Input />
            <Button type="primary">Get code</Button>
          </Space.Compact>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default VCode;
