/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React from 'react';
import { styled, t } from '@superset-ui/core';
import Icons from 'src/components/Icons';
import Loading from 'src/components/Loading';
import FilterControls from './FilterControls/FilterControls';
import { getFilterBarTestId } from './utils';
import { HorizontalBarProps } from './types';
import FilterBarOrientationSelect from './FilterBarOrientationSelect';
import FilterConfigurationLink from './FilterConfigurationLink';

const HorizontalBar = styled.div`
  ${({ theme }) => `
    padding: ${theme.gridUnit * 2}px ${theme.gridUnit * 2}px;
    background: ${theme.colors.grayscale.light5};
    box-shadow: inset 0px -2px 2px -1px ${theme.colors.grayscale.light2};
  `}
`;

const HorizontalBarContent = styled.div`
  ${({ theme }) => `
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: flex-start;
    padding: 0 ${theme.gridUnit * 2}px;
    line-height: 0;

    .loading {
      margin: ${theme.gridUnit * 2}px auto ${theme.gridUnit * 2}px;
      padding: 0;
    }
  `}
`;

const FilterBarEmptyStateContainer = styled.div`
  ${({ theme }) => `
    margin: 0 ${theme.gridUnit * 2}px 0 ${theme.gridUnit * 4}px;
    font-weight: ${theme.typography.weights.bold};
    color: ${theme.colors.grayscale.base};
    font-size: ${theme.typography.sizes.s}px;
  `}
`;

const FiltersLinkContainer = styled.div<{ hasFilters: boolean }>`
  ${({ theme, hasFilters }) => `
    height: 24px;
    display: flex;
    align-items: center;
    padding: 0 ${theme.gridUnit * 4}px 0 ${theme.gridUnit * 4}px;
    border-right: ${
      hasFilters ? `1px solid ${theme.colors.grayscale.light2}` : 0
    };

    button {
      display: flex;
      align-items: center;
      > .anticon {
        height: 24px;
        padding-right: ${theme.gridUnit}px;
      }
      > .anticon + span, > .anticon {
          margin-right: 0;
          margin-left: 0;
        }
    }
  `}
`;

const HorizontalFilterBar: React.FC<HorizontalBarProps> = ({
  actions,
  canEdit,
  dashboardId,
  dataMaskSelected,
  filterValues,
  isInitialized,
  focusedFilterId,
  onSelectionChange,
}) => {
  const hasFilters = filterValues.length > 0;

  return (
    <HorizontalBar {...getFilterBarTestId()}>
      <HorizontalBarContent>
        {!isInitialized ? (
          <Loading position="inline-centered" />
        ) : (
          <>
            {canEdit && <FilterBarOrientationSelect />}
            {!hasFilters && (
              <FilterBarEmptyStateContainer data-test="horizontal-filterbar-empty">
                {t('No filters are currently added to this dashboard.')}
              </FilterBarEmptyStateContainer>
            )}
            {canEdit && (
              <FiltersLinkContainer hasFilters={hasFilters}>
                <FilterConfigurationLink
                  dashboardId={dashboardId}
                  createNewOnOpen={filterValues.length === 0}
                >
                  <Icons.PlusSmall /> {t('Add/Edit Filters')}
                </FilterConfigurationLink>
              </FiltersLinkContainer>
            )}
            {hasFilters && (
              <FilterControls
                dataMaskSelected={dataMaskSelected}
                focusedFilterId={focusedFilterId}
                onFilterSelectionChange={onSelectionChange}
              />
            )}
            {actions}
          </>
        )}
      </HorizontalBarContent>
    </HorizontalBar>
  );
};
export default React.memo(HorizontalFilterBar);
