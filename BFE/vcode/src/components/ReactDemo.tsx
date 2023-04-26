import React from "react";
import type { FC } from "react";
import { Form, Input, Button, message } from "antd";
import { Space } from "antd";
import machine from "../machines/vcode";
import { useMachine } from "@xstate/react";

const VCode: FC = () => {
  const [state, send] = useMachine(machine);
  const form = Form.useForm()[0];

  return (
    <div style={{ width: 400, margin: "100px auto" }}>
      <Form
        name="vcode"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={(values) => message.info(JSON.stringify(values))}
        initialValues={{ tel: "", code: "", redisKey: "" }}
        form={form}
      >
        <Form.Item label="Tel" name="tel">
          <Input
            onChange={({ target }) => {
              send({ type: "TelTyped", tel: target.value });
            }}
          />
        </Form.Item>

        <Form.Item label="Code" name="code">
          <Space.Compact style={{ width: "100%" }}>
            <Input
              disabled={!state.context.token}
              onChange={({ target }) =>
                send({ type: "CodeTyped", code: target.value })
              }
            />
            <Button
              type="primary"
              disabled={state.matches("empty") || state.matches("Tiking")}
              onClick={() => send("ApplyCode")}
            >
              {state.matches("Tiking") ? state.context.tik + "s" : "Get code"}
            </Button>
          </Space.Compact>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            type="primary"
            htmlType="submit"
            disabled={
              !(state.context.code && state.context.tel && state.context.token)
            }
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default VCode;
