import React from "react";
import { Button, Col, Row, Form, Input, Radio } from "antd";
import useModal from "../../../hooks/useModal";
import ConfigHeader from "./ConfigHeader";

const ModalConfigBuilder = () => {
  const { closeModal, modelData } = useModal();
  const [form] = Form.useForm();
  const dataPropsComponent = modelData?.dataPropsComponent;

  return (
    <Form
      className="flex flex-col w-full h-full page-builder-config"
      form={form}
      layout="vertical"
      autoComplete="off"
      labelCol={{
        span: 8,
      }}
      labelAlign="left"
      labelWrap
      wrapperCol={{
        flex: 1,
      }}
      colon={false}
    >
      <div className="w-full">
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              label="Component"
              name="component"
              required
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập",
                },
              ]}
            >
              <Input maxLength={255} />
            </Form.Item>

            <Form.Item
              label="URL"
              name="url"
              required
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập",
                },
              ]}
            >
              <Input maxLength={500} />
            </Form.Item>

            <Form.Item
              label="Method"
              name="method"
              required
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn",
                },
              ]}
            >
              <Radio.Group>
                <Radio value={1}>GET</Radio>
                <Radio value={2}>POST</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label="Author type"
              name="author_type"
              required
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn",
                },
              ]}
            >
              <Radio.Group>
                <Radio value={1}>Bearer Token</Radio>
                <Radio value={2}>None</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label="Body request type"
              name="request_type"
              required
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn",
                },
              ]}
            >
              <Radio.Group>
                <Radio value={1}>JSON</Radio>
                <Radio value={2}>XML</Radio>
              </Radio.Group>
            </Form.Item>

            <ConfigHeader />
          </Col>

          <Col span={12}></Col>
        </Row>
      </div>

      <div className="flex justify-end gap-4 mt-4">
        <Button type="default" onClick={closeModal}>
          {" "}
          Đóng
        </Button>
        <Button type="primary"> Lưu</Button>
      </div>
    </Form>
  );
};

export default ModalConfigBuilder;
