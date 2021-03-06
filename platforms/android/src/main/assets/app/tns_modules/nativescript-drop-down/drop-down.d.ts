/*! *****************************************************************************
Copyright (c) 2015 Tangra Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
***************************************************************************** */

declare module "nativescript-drop-down"
{
    import view = require("ui/core/view");
    import dependencyObservable = require("ui/core/dependency-observable");
    import observable = require("data/observable");

    export class DropDown extends view.View 
    {
        public static itemsProperty: dependencyObservable.Property;
        public static selectedIndexProperty: dependencyObservable.Property;

        items: any;
        selectedIndex: number

        ios: UITextField;
        android: android.widget.Spinner;
    }
}