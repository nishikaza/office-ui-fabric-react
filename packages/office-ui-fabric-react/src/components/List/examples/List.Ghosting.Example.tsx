import * as React from 'react';
import { FocusZone, FocusZoneDirection } from 'office-ui-fabric-react/lib/FocusZone';
import { List } from 'office-ui-fabric-react/lib/List';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { ITheme, mergeStyleSets, getTheme, getFocusStyle } from 'office-ui-fabric-react/lib/Styling';

export type IExampleItem = { name: string; thumbnail: string };

export interface IListGhostingExampleProps {
  items: IExampleItem[];
}

interface IListGhostingExampleClassObject {
  container: string;
  itemCell: string;
  itemImage: string;
  itemContent: string;
  itemName: string;
  itemIndex: string;
  chevron: string;
}

const theme: ITheme = getTheme();
const { palette, semanticColors, fonts } = theme;

const classNames: IListGhostingExampleClassObject = mergeStyleSets({
  container: {
    overflow: 'auto',
    maxHeight: 500
  },
  itemCell: [
    getFocusStyle(theme, { inset: -1 }),
    {
      minHeight: 54,
      padding: 10,
      boxSizing: 'border-box',
      borderBottom: `1px solid ${semanticColors.bodyDivider}`,
      display: 'flex',
      selectors: {
        '&:hover': { background: palette.neutralLight }
      }
    }
  ],
  itemImage: {
    flexShrink: 0
  },
  itemContent: {
    marginLeft: 10,
    overflow: 'hidden',
    flexGrow: 1
  },
  itemName: [
    fonts.xLarge,
    {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  ],
  itemIndex: {
    fontSize: fonts.small.fontSize,
    color: palette.neutralTertiary,
    marginBottom: 10
  },
  chevron: {
    alignSelf: 'center',
    marginLeft: 10,
    color: palette.neutralTertiary,
    fontSize: fonts.large.fontSize,
    flexShrink: 0
  }
});

export class ListGhostingExample extends React.Component<IListGhostingExampleProps> {
  public render(): JSX.Element {
    const { items } = this.props;

    return (
      <FocusZone direction={FocusZoneDirection.vertical}>
        <div className={classNames.container} data-is-scrollable={true}>
          <List items={items} onRenderCell={this._onRenderCell} />
        </div>
      </FocusZone>
    );
  }

  private _onRenderCell(item: IExampleItem, index: number, isScrolling: boolean): JSX.Element {
    return (
      <div className={classNames.itemCell} data-is-focusable={true}>
        <Image
          className={classNames.itemImage}
          src={isScrolling ? undefined : item.thumbnail}
          width={50}
          height={50}
          imageFit={ImageFit.cover}
        />
        <div className={classNames.itemContent}>
          <div className={classNames.itemName}>{item.name}</div>
          <div className={classNames.itemIndex}>{`Item ${index}`}</div>
        </div>
      </div>
    );
  }
}
