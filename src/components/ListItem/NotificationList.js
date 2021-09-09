import React from "react";
import { StyleSheet, FlatList } from "react-native";

import ListItem from "./ListItem";

const NotificationList = props => {
  return (
    <FlatList
      style={styles.listContainer}
      data={props.notifications}
      renderItem={(info) => (
        <ListItem
          text={info.item.description}
          time={info.item.date}
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

export default NotificationList;
