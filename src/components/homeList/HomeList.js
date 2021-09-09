import React from "react";
import { StyleSheet, FlatList } from "react-native";

import HomeItem from "./HomeItem";
import { GREYCOLOR } from "../../utls/layout";

const HomeList = props => {
  return (
    <FlatList
    showsVerticalScrollIndicator={false}
      style={styles.listContainer}
      data={props.orders}
      renderItem={(info) => (
        <HomeItem
          id={info.item.id}
          last_status={info.item.last_status}
          price = {info.item.price}
          date = {info.item.date}
          type= {info.item.type}
        />
      )}
    />
  );
};


const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    width: "100%",
    backgroundColor:'white',
    marginBottom: 8,
    marginTop: 8
  }
});

export default HomeList;