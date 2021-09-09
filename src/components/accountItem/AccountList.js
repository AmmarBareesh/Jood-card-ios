import React from "react";
import { StyleSheet, FlatList } from "react-native";

import AccountItem from "./AccountItem";

const AccountList = props => {
  return (
    <FlatList
    showsVerticalScrollIndicator={false}
      style={styles.listContainer}
      onEndReached={()=>{
        if(!props.is_last_page){
        props.loadMore()
    }
      }}
      data={props.accounts}
      renderItem={(info) => (
        <AccountItem
          id={info.item.id}
          amount={info.item.amount}
          type = {info.item.type}
          date = {new Date(info.item.date)}
          statement= {info.item.statement}
        />
      )}
    />
  );
};


const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    width: "100%",
    marginBottom: 8,
    marginTop: 8
  }
});

export default AccountList;