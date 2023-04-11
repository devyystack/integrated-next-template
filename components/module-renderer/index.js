import Marquee from '@/components/marquee';
import Text from '@/components/text';
import ShippingTable from '@/components/shipping-table';
import Faq from '@/components/faq';
import { get } from 'lodash';
const ModuleRenderer = ({ modules }) => {
  const moduleList = get(modules, 'body', null);
  return (
    <div>
      {moduleList &&
        moduleList.map((m, index) => {
          const { __typename } = m;
          switch (__typename) {
            case 'PageBodyMarquee':
              return <Marquee data={m} key={index} />;
            case 'PageBodyText':
              return <Text data={m} key={index} />;
            case 'PageBodyTable':
              return <ShippingTable data={m} key={index} />;
            case 'PageBodyFaq':
              return <Faq data={m} key={index} />;
          }
        })}
    </div>
  );
};

export default ModuleRenderer;
