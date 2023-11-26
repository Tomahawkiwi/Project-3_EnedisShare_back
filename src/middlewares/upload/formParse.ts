/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from "multiparty";

function asyncFormParse(req: any): Promise<{ fields: any; files: any }> {
  return new Promise((resolve, reject) => {
    const form = new Form();
    form.parse(req, async (err, fields, files) => {
      const keys = Object.keys(fields);
      keys.forEach((key: any) => {
        fields[key].forEach(function callback(value: any, index: number) {
          if (value === "true") {
            fields[key][index] = true;
          }
          if (value === "false") {
            fields[key][index] = false;
          }
        });
      });
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
}

export default asyncFormParse;
