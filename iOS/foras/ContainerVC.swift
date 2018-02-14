//
//  ViewController.swift
//  foras
//
//  Created by Damian Perera on 2/13/18.
//  Copyright © 2018 Damian Perera. All rights reserved.
//

import UIKit

class ContainerVC: UIViewController {

    @IBOutlet weak var sideMenuConstraint: NSLayoutConstraint!
    var sideMenuOpen = false
    
    override func viewDidLoad() {
        super.viewDidLoad()
        NotificationCenter.default.addObserver(self,
                                               selector: #selector(toggleSideMenu),
                                               name: NSNotification.Name("ToggleSideMenu"),
                                               object: nil)
    }
    
    @objc func toggleSideMenu() {
        if sideMenuOpen {
            sideMenuOpen = false
            sideMenuConstraint.constant = -273
            NotificationCenter.default.post(name: NSNotification.Name("ResetBackgroundForSideMenu"), object: nil)
        } else {
            sideMenuOpen = true
            sideMenuConstraint.constant = 0
            NotificationCenter.default.post(name: NSNotification.Name("DimBackgroundForSideMenu"), object: nil)
        }
        UIView.animate(withDuration: 0.3) {
            self.view.layoutIfNeeded()
        }
    }

}

