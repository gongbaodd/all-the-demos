import React, { useEffect, useState, useCallback } from "react";
import type { FC } from "react";
import { Form, Input, Button, message } from "antd";
import { Space } from "antd";

const getRedisKey = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return "fake Redis key";
};

const CODE_HINT = "Get code";

const VCode: FC = () => {
  const [tel, setTel] = useState<string>("");
  const [submitable, setSubmitable] = useState<boolean>(false);
  const [canGetCode, setCanGetCode] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");
  const [startCount, setStartCount] = useState<boolean>(false);
  const [codeHint, setCodeHint] = useState<string>(CODE_HINT);
  const [redisKey, setRedisKey] = useState<string>("");
  const [form] = Form.useForm();

  useEffect(() => {
    setCanGetCode(!!tel);
  }, [tel]);

  useEffect(() => {
    setSubmitable(/\d/.test(code));
  }, [tel, code]);

  useEffect(() => {
    let timer: null | number = null;
    if (startCount) {
      let count = 60;
      timer = setInterval(() => {
        if (count <= 0) {
          setStartCount(false);
          setCodeHint(CODE_HINT);
          setCanGetCode(true);
          timer && clearInterval(timer);
        } else {
          count--;
          setCodeHint(`${count}s`);
          setCanGetCode(false);
        }
      }, 1000);
    }

    return () => {
      timer && clearInterval(timer);
    };
  }, [startCount]);

  return (
    <div style={{ width: 400, margin: "100px auto" }}>
      <Form
        name="vcode"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={(values) => message.info(JSON.stringify(values))}
        initialValues={{ tel, code, redisKey }}
        form={form}
      >
        <Form.Item label="Tel" name="tel">
          <Input onChange={({ target }) => setTel(target.value)} />
        </Form.Item>

        <Form.Item label="Code" name="code">
          <Space.Compact style={{ width: "100%" }}>
            <Input
              disabled={!redisKey}
              onChange={({ target }) => setCode(target.value)}
            />
            <Button
              type="primary"
              disabled={!canGetCode}
              onClick={async () => {
                setStartCount(true);
                const key = await getRedisKey();
                setRedisKey(key);
                form.setFieldsValue({ redisKey: key });
              }}
            >
              {codeHint}
            </Button>
          </Space.Compact>
        </Form.Item>

        <Form.Item label="Redis Key" name="redisKey" hidden>
          <Input type="hidden" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" disabled={!submitable}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default VCode;
