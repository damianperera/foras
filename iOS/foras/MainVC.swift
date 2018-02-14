//
//  MainVC.swift
//  foras
//
//  Created by Damian Perera on 2/14/18.
//  Copyright © 2018 Damian Perera. All rights reserved.
//

import UIKit

class MainVC: UIViewController {

    let blackView = UIView()
    
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
        NotificationCenter.default.addObserver(self,
                                               selector: #selector(dimBackground),
                                               name: NSNotification.Name("DimBackgroundForSideMenu"),
                                               object: nil)
        NotificationCenter.default.addObserver(self,
                                               selector: #selector(resetBackground),
                                               name: NSNotification.Name("ResetBackgroundForSideMenu"),
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
    
    @objc func dimBackground() {
        print ("Dimming Background")
        blackView.backgroundColor = UIColor(white:0, alpha: 0.5)
        view.addSubview(blackView)
        blackView.frame = view.frame
        blackView.alpha = 0
        
        UIView.animate(withDuration: 0.5, animations: {
            self.blackView.alpha = 1
        })
    }
    
    @objc func resetBackground() {
        print ("Resetting Background")
        UIView.animate(withDuration: 0.5) {
            self.blackView.alpha = 0
        }
    }
    
}
