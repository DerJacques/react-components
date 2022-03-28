/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React from 'react';
import useResizeObserver from "use-resize-observer";
import { Story } from '@storybook/react';
import { PaneProvider, Pane, IPaneProviderReturnProps } from '@zendeskgarden/react-grid';

interface IArgs {
  rows: number;
  cols: number;
}

const makeArray = (length: number) => {
  return Array.from({ length }, () => 0).map((_, index) => index + 1);
};

export const SplitterStory: Story<IArgs> = ({ rows, cols }) => {
  const { ref, width = 1, height = 1 } = useResizeObserver<HTMLDivElement>();

  return (
    <PaneProvider
      totalPanesWidth={width}
      totalPanesHeight={height}
      totalHeightFractions={rows}
      totalWidthFractions={cols}
      defaultLayoutValues={{
        ...makeArray(cols).reduce((prev: any, value) => {
          prev[`column-${value % cols}`] = 1;

          return prev;
        }, {}),
        ...makeArray(rows).reduce((prev: any, value) => {
          prev[`row-${value % rows}`] = 1;

          return prev;
        }, {})
      }}
    >
      {({ getLayoutValue }: IPaneProviderReturnProps) => {
        const isNotLastRow = (value: number) => value < rows * cols - cols + 1;

        return (
          <div
            ref={ref}
            style={{
              display: 'grid',
              width: '100%',
              height: '800px',
              gridTemplateRows: makeArray(rows)
                .map(value => `${getLayoutValue(`row-${value % rows}`, 'height')}fr`)
                .join(' '),
              gridTemplateColumns: makeArray(cols)
                .map(value => `${getLayoutValue(`column-${value % cols}`, 'width')}fr`)
                .join(' '),
            }}
          >
            {makeArray(rows * cols).map(value => (
              <div key={`pane-${value}`}>
                <Pane>
                  <Pane.Content>{`pane-${value}`}</Pane.Content>
                  {value % cols !== 0 && (
                    <Pane.Splitter
                      layoutKey={`column-${value % cols}`}
                      orientation="end"
                      min={0}
                      max={2}
                    />
                  )}
                  {isNotLastRow(value) && (
                    <Pane.Splitter
                      layoutKey={`row-${Math.ceil(value / cols)}`}
                      orientation="bottom"
                      min={0}
                      max={2}
                    />
                  )}
                </Pane>
              </div>
            ))}
          </div>
        );
      }}
    </PaneProvider>
  );
};
