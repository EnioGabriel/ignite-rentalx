import { IDateProvider } from "../IDateProvider";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { injectable } from "tsyringe";

dayjs.extend(utc);

@injectable()
class DayjsDateProvider implements IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number {
    const start_date_utc = this.convertToUTC(start_date);
    const end_date_utc = this.convertToUTC(end_date);
    return dayjs(end_date_utc).diff(start_date_utc, "hour");
  }

  convertToUTC(date: Date): string {
    // Retorna hora para poder pegar horário com 24h de diferença
    return dayjs(date).utc().local().format();
  }

  dateNow(): Date {
    return dayjs().toDate();
  }
}

export { DayjsDateProvider };
