import { Button, Card, Grid, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import cardCar from "../../assets/carousel/newlyAddedCar.jpg";

interface ICsCarCard {
  imageURL?: string;
  title?: string;
  description?: string;
  price?: string;
  slug?: any;
  reqBy?: string;
  styleBy?: string;
}

const CsCarCard = ({
  imageURL,
  title,
  description,
  price,
  slug,
  reqBy,
  styleBy,
}: ICsCarCard) => {
  const navigate = useNavigate();
  const screen = Grid.useBreakpoint();
  const cardStyleWidthHeight = () => {
    if (styleBy === "home") return { width: 320, height: 380 };
    if (styleBy === "responsive")
      return { width: screen.xs ? 300 : 360, height: 380 };
    return { width: 360, height: 380 };
  };
  return (
    <Card
      hoverable={true}
      bordered
      style={cardStyleWidthHeight()}
      cover={
        <img
          alt="example"
          src={imageURL ?? cardCar}
          style={{ height: 230, objectFit: "cover" }}
        />
      }
      actions={[
        <Button shape="round">Rs.{price?.toLocaleString()} </Button>,
        <Button
          type="primary"
          onClick={() => navigate(`/salesground/${reqBy}/details/${slug}`)}
        >
          Details
        </Button>,
      ]}
    >
      <Card.Meta
        title={title ? title : "Tesla S Model"}
        description={
          description
            ? description
            : "Very good condition tesla s model worth to buy."
        }
        style={{ height: "5rem", textOverflow: "ellipsis" }}
      />
    </Card>
  );
};

export default CsCarCard;
