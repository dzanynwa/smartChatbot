import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import DataOverview from './views/data-overview';
import Interviewing from './views/Interviewing';
import SkillTest from './views/skillTest';

const Routes = () => {
  return (
    <Suspense fallback={'Loading...'}>
      <Switch>
        <Route path="/" exact>
          <Interviewing />
        </Route>
        <Route path="/skillTest" exact>
          <SkillTest />
        </Route>
        <Route path="/dataOverview" exact>
          <DataOverview />
        </Route>
      </Switch>
    </Suspense>
  );
};

export default Routes;