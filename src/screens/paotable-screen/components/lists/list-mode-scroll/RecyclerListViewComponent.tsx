import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface PropsT { rowRenderer, iterator, rowHeight, bgColors: { rowOddBgColor, rowEvenBgColor } }
interface StateT { list }
class RecyclerListViewComponent extends Component<PropsT, StateT> {
  constructor(props) {
    super(props);
    this.state = {
      list: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(this.props.iterator),
    };
    this.layoutProvider = new LayoutProvider((i) => {
      return i
    }, (i, dim) => {
      dim.width = SCREEN_WIDTH;
      dim.height = this.props.rowHeight;
    })
  }
  layoutProvider: any = {}

  render() {
    return (
      <View style={{ flex: 1 }}>
        <RecyclerListView
          renderFooter={() => <View style={{ height: this.props.rowHeight }} />}
          style={{ paddingBottom: 85 }}
          rowRenderer={this.props.rowRenderer}
          dataProvider={this.state.list}
          layoutProvider={this.layoutProvider}
        />
      </View>
    );
  }
}




export default RecyclerListViewComponent