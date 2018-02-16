//
/**
 
Copyright 2018 Damian Perera

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 
SideMenuVC.swift in foras
Created by Damian Perera on 2/14/18.

*/

import UIKit

class SideMenuVC: UITableViewController {

    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        print("Selected: ", indexPath.row)
        tableView.deselectRow(at: indexPath, animated: true)
        NotificationCenter.default.post(name: NSNotification.Name("ToggleSideMenu"), object: nil)
        switch indexPath.row {
        case 0: break
        case 1: NotificationCenter.default.post(name: NSNotification.Name("ShowHostSettings"), object: nil)
        case 2: NotificationCenter.default.post(name: NSNotification.Name("ShowEditorSettings"), object: nil)
        case 3: NotificationCenter.default.post(name: NSNotification.Name("ShowNetworkSettings"), object: nil)
        default: break
        }
    }
}
