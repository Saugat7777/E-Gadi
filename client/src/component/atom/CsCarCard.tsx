import { Button, Card, Tag } from "antd";
import cardCar from "../../assets/carousel/newlyAddedCar.jpg";
const CsCarCard = () => {
  return (
    <Card
      hoverable={true}
      bordered
      style={{ width: 300 }}
      cover={<img alt="example" src={cardCar} />}
      actions={[
        <Tag color="#55acee" style={{ marginTop: ".3rem" }}>
          Price: 13000
        </Tag>,
        <Button type="primary">Read More</Button>,
      ]}
    >
      <Card.Meta
        title="Tesla S Model"
        description="Very good condition tesla s model worth to buy."
      />
    </Card>
  );
};

export default CsCarCard;
