import React, {FC} from 'react';

import {Icon, IconType} from '@thenewboston/ui';
import clsx from 'clsx';
import {A} from 'components';
import {NAVBAR_HEIGHT, LIVING_WHITEPAPER_TOP_LINKS_HEIGHT} from 'constants/offsets';
import {Link} from 'react-scroll';
import {useLocation, useHistory} from 'react-router';
import {PATHNAME_TO_DROPDOWN_SELECTIONS, projectRulesPath} from '../../constants';

import './SideMenu.scss';

type Props = {
  breadcrumbHeight: number;
};

const SideMenu: FC<Props> = ({breadcrumbHeight}) => {
  const {pathname} = useLocation();
  const history = useHistory();

  const isProjectRulesSelected = pathname.includes(projectRulesPath);

  return (
    <div className="SideMenu">
      <div className="SideMenu__section">
        <button
          className={clsx('SideMenu__section-header', isProjectRulesSelected && 'SideMenu__section-header--active')}
          onClick={() => history.push(projectRulesPath)}
        >
          <div>RULES & GUIDELINES</div>
          <Icon
            className="SideMenu__toggle-icon"
            icon={isProjectRulesSelected ? IconType.chevronUp : IconType.chevronDown}
            size={20}
            totalSize={20}
          />
        </button>
        {isProjectRulesSelected &&
          PATHNAME_TO_DROPDOWN_SELECTIONS.rules.map((selection) => {
            const selectionHash = selection.url.slice(selection.url.indexOf('#') + 1);
            return (
              <Link
                activeClass="SideMenu__link--active"
                className={clsx('SideMenu__link')}
                hashSpy
                ignoreCancelEvents
                key={selection.url}
                offset={-(NAVBAR_HEIGHT + LIVING_WHITEPAPER_TOP_LINKS_HEIGHT + breadcrumbHeight)}
                smooth
                spy
                to={selectionHash}
              >
                {selection.title}
              </Link>
            );
          })}
      </div>
      <div className="SideMenu__section">
        <A
          className="SideMenu__section-header"
          href="https://github.com/thenewboston-developers/Projects/issues/new?assignees=&labels=Project&template=project-proposal.md&title=NAME_OF_YOUR_PROJECT"
        >
          PROPOSE A PROJECT
        </A>
      </div>
    </div>
  );
};

export default SideMenu;
