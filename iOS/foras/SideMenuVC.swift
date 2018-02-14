//
//  SideMenuVC.swift
//  foras
//
//  Created by Damian Perera on 2/14/18.
//  Copyright © 2018 Damian Perera. All rights reserved.
//

import UIKit

class SideMenuVC: UITableViewController {

    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        print("Selected: ", indexPath.row)
        NotificationCenter.default.post(name: NSNotification.Name("ToggleSideMenu"), object: nil)
        switch indexPath.row {
        case 0: NotificationCenter.default.post(name: NSNotification.Name("ShowHostSettings"), object: nil)
        case 1: NotificationCenter.default.post(name: NSNotification.Name("ShowEditorSettings"), object: nil)
        case 2: NotificationCenter.default.post(name: NSNotification.Name("ShowNetworkSettings"), object: nil)
        default: break
        }
    }
}
