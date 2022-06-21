import React, {FC, memo} from 'react';
import ThemeSwitcher from "./components/ThemeSwitcher";
import Users from "./components/Users";

const App: FC = () => {
  return (
    <div className="App">
      <ThemeSwitcher/>
      <Users/>
    </div>
  );
};

export default memo(App);
