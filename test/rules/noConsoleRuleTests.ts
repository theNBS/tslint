/*
 * Copyright 2013 Palantir Technologies, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {TestUtils} from "../lint";

describe("<no-console>", () => {
    const NoConsoleRule = TestUtils.getRule("no-console");
    const fileName = "rules/noconsole.test.ts";

    it("forbids access to specified console properties", () => {
        const dirFailure = TestUtils.createFailuresOnFile(fileName, NoConsoleRule.FAILURE_STRING_PART + "console.dir")([3, 1], [3, 12]);
        const errorFailure = TestUtils.createFailuresOnFile(fileName, NoConsoleRule.FAILURE_STRING_PART + "console.error")([7, 1], [7, 14]);
        const logFailure = TestUtils.createFailuresOnFile(fileName, NoConsoleRule.FAILURE_STRING_PART + "console.log")([2, 1], [2, 12]);
        const warnFailure = TestUtils.createFailuresOnFile(fileName, NoConsoleRule.FAILURE_STRING_PART + "console.warn")([6, 1], [6, 13]);

        const actualFailures = TestUtils.applyRuleOnFile(fileName, NoConsoleRule, [true, "dir", "error", "log", "warn"]);
        TestUtils.assertContainsFailure(actualFailures, dirFailure);
        TestUtils.assertContainsFailure(actualFailures, errorFailure);
        TestUtils.assertContainsFailure(actualFailures, logFailure);
        TestUtils.assertContainsFailure(actualFailures, warnFailure);
    });
});