import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSalads, getSubscriptions } from "@/utils/Services";
import { DayPreference } from "../DayPreference";
import { Label } from "../CommonComponents";
import { Table } from "../Table";
import { TimePreference } from "../TimePreference";

/**
 * View which shows subscriber list
 *
 * @returns View
 */
export const SubscriberList = () => {
  const dispatch = useDispatch();
  
  const subscriptions = useSelector((state) => state.subscriptions.value);
  const salads = useSelector((state) => state.salads.value);

  // Map<size, salad> added easy access to the salad by type
  const [saladMapper, setSaladMapper] = useState(null);

  useEffect(() => {
    if (salads?.length) {
      const newSaladMapper = {};

      // Filter salads which are not used in plans
      salads
        .filter((saladItem) => saladItem.targetStockByWeekday?.length)
        .forEach((saladItem) => {
          newSaladMapper[saladItem.size] = saladItem;
        });

      setSaladMapper(newSaladMapper);
    }
  }, [salads]);

  useEffect(() => {
    if (!subscriptions?.length) {
      getSubscriptions(dispatch);
    }

    if (!salads?.length) {
      getSalads(dispatch);
    }
  }, []);

  // Table fields which will be shown in the table
  const tableFields = [
    {
      key: "name",
      title: "Subscriber Name",
    },
    {
      key: "type",
      title: "Salad Type",
      position: "center",
      // Create label for the size
      componentCreator: ({ type }) => <Label>{type}</Label>,
    },
    {
      key: "weekdays",
      title: "Day Preference",
      position: "center",
      // Create day preference component for the weekdays
      componentCreator: ({ weekdays }) => (
        <DayPreference selectedDays={weekdays} />
      ),
    },
    {
      key: "timePreference",
      title: "Time Preference",
      position: "center",
      // Create time preference component for the weekdays
      componentCreator: ({ timePreference }) => (
        <TimePreference timePreference={timePreference} />
      ),
    },
    {
      key: "price",
      title: "Planned Weekly Payment",
      position: "center",
      // Create price text for the total
      textFormat: (index, key, item) =>
        saladMapper && saladMapper[item.type]
          ? `${(item.weekdays.length * saladMapper[item.type]?.price).toFixed(
              2
            )} €`
          : "-",
    },
  ];

  return (
    <Table
      title={"Subscriber List"}
      tableFields={tableFields}
      list={subscriptions}
    />
  );
};

export default SubscriberList;
