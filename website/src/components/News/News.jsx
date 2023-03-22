import { Content } from "../Content";
import { NewsData } from "./NewsData";

const News = () => {
  return (
    <Content title="News">
      <div className="flex w-full flex-col">
        <NewsData articles={9} />
      </div>
    </Content>
  );
};

export default News;
