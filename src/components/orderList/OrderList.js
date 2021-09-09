import React from "react";
import { StyleSheet, FlatList,Text } from "react-native";

import OrderItem from "./OrderItem";

const OrderList = props => {
  return (
    <FlatList
    showsVerticalScrollIndicator={false}
      style={styles.listContainer}
      onEndReached={()=>{
        if(!props.is_last_page){
        props.loadMore()
    }
      }}
      data={props.orders}
      renderItem={(info) => (
        <OrderItem
          id={info.item.id}
          total={info.item.total}
          last_status = {info.item.last_status}
          date = {info.item.date}
          shipping_price= {info.item.shipping_price}
          deleteById = {props.deleteById}
          navigateTo = {props.navigateTo}
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

export default OrderList;