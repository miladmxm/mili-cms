import OptionList from "../components/options/optionList";
import { getOptions } from "../dal/query";

const Options = async () => {
  const options = await getOptions();
  return <OptionList options={options} />;
};

export default Options;
