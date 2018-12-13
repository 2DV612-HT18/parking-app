import { getConnection } from "typeorm";
import moment from "moment";
import { dateReg, timeReg } from "../../lib/rates/format";
import REPEAT from "../../lib/rates/REPEAT";
import ParkingArea from "../../models/ParkingArea";
import Rate from "../../models/Rate";
import isDatesOverlapping from "../../lib/rates/isDatesOverlapping";

export const resolvers = {
  Mutation: {
    addRate: async (
      _,
      { parkingAreaID, startDate, endDate, startTime, endTime, charge },
      { user }
    ) => {
      // Cancel if our dates and times are not in the correct format
      if (
        !startDate.match(dateReg) ||
        !endDate.match(dateReg) ||
        !startTime.match(timeReg) ||
        !endTime.match(timeReg)
      ) {
        return null;
      }

      const connection = getConnection();
      const parkingAreaRepository = connection.getRepository(ParkingArea);

      const parkingArea = await parkingAreaRepository.findOne({
        where: { id: parkingAreaID, owner: user.id },
        relations: ["rates"]
      });

      // Cancel if we can't find a parking area
      if (!parkingArea) {
        return null;
      }

      const startDate1 = moment().format(`${startDate} ${startTime}`);
      const endDate1 = moment().format(`${endDate} ${endTime}`);

      // Cancel if our end date is before our start date
      if (!moment(startDate1).isSameOrBefore(endDate1)) {
        return null;
      }

      // Filter highest priority dates that are overlapping
      const filteredRates = parkingArea.rates.filter(rate => {
        const startDate2 = moment().format(
          `${rate.startDate} ${rate.startTime}`
        );
        const endDate2 = moment().format(`${rate.endDate} ${rate.endTime}`);
        return (
          rate.repeat === REPEAT.NEVER &&
          isDatesOverlapping(startDate1, endDate1, startDate2, endDate2)
        );
      });

      // Cancel if we have overlapping dates
      if (filteredRates.length > 0) {
        return null;
      }

      const rate = new Rate(
        0,
        startTime,
        endTime,
        startDate,
        endDate,
        charge,
        REPEAT.NEVER,
        parkingArea
      );

      await connection.manager.save(rate);

      return rate;
    }
  }
};
