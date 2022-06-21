import "./SettingBoxes.css";
import "./SettingBoxValidation.css";
import { useFormik } from "formik";
import { latestEndValidation, getLatestEndErrors } from "../validations/LatestEndValidations";
import { earliestStartValidation, getEarliestStartErrors } from "../validations/EarliestStartValidations";
import { 
  workIntervalStartValidation,
  workIntervalEndValidation,
  getworkIntervalEndErrors,
  getWorkIntervalEndErrors 
} from "../validations/WorkIntervalValidations";

const SettingBoxes = ({ name, settingsValues }) => {
  const displayError = (workStartErrors, workEndErrors) => {

  }  
  const formik = useFormik({
    initialValues: {
      workStart: "",
      workEnd: "",
      latestEnd: "",
      earliestStart: ""
    },
    validate: (values) => {
      const errors = {};
      earliestStartValidation(values, errors);
      latestEndValidation(values, errors);
      workIntervalStartValidation(values, errors);
      workIntervalEndValidation(values, errors);
      return errors;
    },
  });

  return (
    <div className="SettingBox">
      <div className="SettingsInternalBox">
        <form>
          {(() => {
            switch (name) {
              case "workInterval":
                return (
                  <>
                    <label>
                      Work only from
                      <input
                        id="settingsInput"
                        name="workStart"
                        onBlur={formik.handleBlur}
                        defaultValue={settingsValues.workStart}
                        onFocus={e => {
                          e.target.value = formik.values.workStart;
                        }}
                        onChange={e => {
                          formik.values.workStart = e.target.value
                          formik.handleChange(e);
                          if (getworkIntervalEndErrors(e.target.value).length === 0) {
                            settingsValues.workStart = e.target.value;
                          }
                        }}
                      />
                      to
                      <input
                        id="settingsInput"
                        name="workEnd"
                        onBlur={formik.handleBlur}
                        defaultValue={settingsValues.workEnd}
                        onFocus={e => {
                          e.target.value = formik.values.workEnd;
                        }}
                        onChange={e => {
                          formik.values.workEnd = e.target.value
                          formik.handleChange(e);
                          if (getWorkIntervalEndErrors(e.target.value).length === 0) {
                            settingsValues.workEnd = e.target.value;
                          }
                        }}
                      />
                    </label>
                    {formik.touched.workStart && formik.errors.workStart 
                      ? <div className="ValidationError"> {formik.errors.workStart} </div>
                      : <> </>
                    }
                    {formik.touched.workEnd && formik.errors.workEnd 
                      ? <div className="ValidationError"> {formik.errors.workEnd} </div>
                      : <> </>
                    }
                  </>
                );
              case "latestEnd":
                return (
                  <>
                    <label>
                      Latest end hour
                      <input
                        id="settingsInput"
                        name="latestEnd"
                        onBlur={formik.handleBlur}
                        defaultValue={settingsValues.latestEnd}
                        onFocus={e => {
                          e.target.value = formik.values.latestEnd;
                        }}
                        onChange={e => {
                          formik.values.latestEnd = e.target.value
                          formik.handleChange(e);
                          if (getLatestEndErrors(e.target.value).length === 0) {
                            settingsValues.latestEnd = e.target.value;
                          }
                        }}
                      />
                    </label>
                    {formik.touched.latestEnd && formik.errors.latestEnd 
                     ? <div className="ValidationError"> {formik.errors.latestEnd} </div>
                     : <> </>
                    }
                  </>
                );
              case "earliestStart":
                return (
                  <>
                    <label>
                      Earliest start hour
                      <input
                        id="settingsInput"
                        name="earliestStart"
                        onBlur={formik.handleBlur}
                        defaultValue={settingsValues.earliestStart}
                        onFocus={e => {
                          e.target.value = formik.values.earliestStart;
                        }}
                        onChange={(e) => {
                          formik.values.earliestStart = e.target.value
                          formik.handleChange(e);
                          if (getEarliestStartErrors(e.target.value).length === 0) {
                            settingsValues.earliestStart = e.target.value;
                          }
                        }}
                      />
                    </label>
                    {formik.touched.earliestStart && formik.errors.earliestStart 
                      ? <div className="ValidationError"> {formik.errors.earliestStart} </div>
                      : <> </>
                    }
                  </>
                );
              case "dayShifts":
                return <label>No day shifts </label>;
              case "nightShifts":
                return <label>No night shifts </label>;
              case "break":
                return (
                  <label>
                    Break (in hours) after night shifts:
                    <input
                      id="settingsInput"
                      defaultValue={settingsValues.breakAfterNightShifts}
                      onChange={(e) =>
                        (settingsValues.breakAfterNightShifts = e.target.value)
                      }
                    />
                  </label>
                );
              case "sameSchedule":
                return <label>Same schedule every day </label>;
              default:
            }
          })()}
        </form>
      </div>
    </div>
  );
};
export default SettingBoxes;
