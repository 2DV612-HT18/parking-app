import moment from "moment";

export default function isDatesOverlapping(
  startDate1,
  endDate1,
  startDate2,
  endDate2
) {
  return (
    moment(startDate1).isSameOrBefore(endDate2) &&
    moment(startDate2).isSameOrBefore(endDate1)
  );
}
