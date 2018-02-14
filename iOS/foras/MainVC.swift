//
//  MainVC.swift
//  foras
//
//  Created by Damian Perera on 2/14/18.
//  Copyright © 2018 Damian Perera. All rights reserved.
//

import UIKit

class MainVC: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        NotificationCenter.default.addObserver(self,
                                               selector: #selector(showHostSettings),
                                               name: NSNotification.Name("ShowHostSettings"),
                                               object: nil)
        NotificationCenter.default.addObserver(self,
                                               selector: #selector(showEditorSettings),
                                               name: NSNotification.Name("ShowEditorSettings"),
                                               object: nil)
        NotificationCenter.default.addObserver(self,
                                               selector: #selector(showNetworkSettings),
                                               name: NSNotification.Name("ShowNetworkSettings"),
                                               object: nil)
    }
    
    @objc func showHostSettings() {
        performSegue(withIdentifier: "ShowHostSettings", sender: nil)
    }
    
    @objc func showEditorSettings() {
        performSegue(withIdentifier: "ShowEditorSettings", sender: nil)
    }
    
    @objc func showNetworkSettings() {
        performSegue(withIdentifier: "ShowNetworkSettings", sender: nil)
    }
    
    @IBAction func onMenuTapped() {
        print("Toggle Side Menu")
        NotificationCenter.default.post(name: NSNotification.Name("ToggleSideMenu"), object: nil)
    }
    
}
